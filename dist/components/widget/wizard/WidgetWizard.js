'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('./constants');

var _request = require('../../../utils/request');

var _step = require('./steps/step-1');

var _step2 = _interopRequireDefault(_step);

var _step3 = require('./steps/step-2');

var _step4 = _interopRequireDefault(_step3);

var _step5 = require('./steps/step-3');

var _step6 = _interopRequireDefault(_step5);

var _Navigation = require('../../form/Navigation');

var _Navigation2 = _interopRequireDefault(_Navigation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WidgetWizard = function (_React$Component) {
  _inherits(WidgetWizard, _React$Component);

  function WidgetWizard(props) {
    _classCallCheck(this, WidgetWizard);

    var _this = _possibleConstructorReturn(this, (WidgetWizard.__proto__ || Object.getPrototypeOf(WidgetWizard)).call(this, props));

    _this.state = _extends({}, _constants.STATE_DEFAULT, {
      form: _extends({}, _constants.STATE_DEFAULT.form, {
        application: props.application
      })
    });

    _this.onSubmit = _this.onSubmit.bind(_this);
    _this.onFormChange = _this.onFormChange.bind(_this);
    _this.onWizardChange = _this.onWizardChange.bind(_this);
    return _this;
  }

  _createClass(WidgetWizard, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      if (this.props.dataset) {
        // Start the loading
        this.setState({ loading: true });

        (0, _request.get)({
          url: 'https://api.resourcewatch.org/v1/dataset/' + this.props.dataset,
          headers: [{
            key: 'Content-Type',
            value: 'application/json'
          }],
          onSuccess: function onSuccess(response) {
            _this2.setState({
              dataset: _extends({
                id: response.data.id
              }, response.data.attributes),
              // Stop the loading
              loading: false
            });
          },
          onError: function onError(error) {
            _this2.setState({ loading: false });
            console.error(error);
          }
        });
      }
    }

    /**
     * UI EVENTS
     * - onFormChange
     * - onWizardChange
     * - onSubmit
    */

  }, {
    key: 'onFormChange',
    value: function onFormChange(obj) {
      var _this3 = this;

      var form = Object.assign({}, this.state.form, obj);
      this.setState({ form: form }, function () {
        return console.info(_this3.state.form);
      });
    }
  }, {
    key: 'onWizardChange',
    value: function onWizardChange(obj) {
      var _this4 = this;

      var wizard = Object.assign({}, this.state.wizard, obj);
      this.setState({ wizard: wizard }, function () {
        return console.info(_this4.state.wizard);
      });
    }
  }, {
    key: 'onSubmit',
    value: function onSubmit(e) {
      var _this5 = this;

      if (e) e.preventDefault();

      // Validate the form
      _constants.FORM_ELEMENTS.validate(this.state.step);

      // Set a timeout due to the setState function of react
      setTimeout(function () {
        var valid = _constants.FORM_ELEMENTS.isValid(_this5.state.step);
        if (valid) {
          if (_this5.state.step === _this5.state.stepLength && !_this5.state.submitting) {
            // Start the submitting
            _this5.setState({ submitting: true });

            (0, _request.post)({
              type: _this5.state.dataset && _this5.state.widget ? 'PATCH' : 'POST',
              url: 'https://api.resourcewatch.org/v1/dataset/' + _this5.state.dataset.id + '/widget/' + (_this5.state.widget || ''),
              body: _this5.state.form,
              headers: [{
                key: 'Content-Type',
                value: 'application/json'
              }, {
                key: 'Authorization',
                value: _this5.props.authorization
              }],
              onSuccess: function onSuccess(response) {
                console.info(response);
                alert('upload widget correctly');
              },
              onError: function onError(error) {
                _this5.setState({ submitting: false, loading: false });
                console.error(error);
              }
            });
          } else {
            _this5.setState({
              step: _this5.state.step + 1
            }, function () {
              return console.info(_this5.state);
            });
          }
        }
      }, 0);
    }

    /**
     * HELPERS
     * - setStep
     * - setFormFromParams
    */

  }, {
    key: 'setStep',
    value: function setStep(step) {
      this.setState({ step: step });
    }
  }, {
    key: 'setFormFromParams',
    value: function setFormFromParams(params) {
      var _this6 = this;

      var form = Object.keys(this.state.form);
      var newForm = {};

      form.forEach(function (f) {
        if (params[f] || _this6.state.form[f]) {
          newForm[f] = params[f] || _this6.state.form[f];
        }
      });

      return newForm;
    }

    /**
     * RENDER
    */

  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

      var _state = this.state,
          dataset = _state.dataset,
          form = _state.form,
          wizard = _state.wizard,
          step = _state.step,
          stepLength = _state.stepLength,
          submitting = _state.submitting,
          loading = _state.loading;


      return _react2.default.createElement(
        'form',
        { className: 'c-form', onSubmit: this.onSubmit, noValidate: true },
        step === 1 && !!dataset && _react2.default.createElement(_step2.default, {
          dataset: dataset,
          form: form,
          onChange: function onChange(value) {
            _this7.onFormChange(value);
          }
        }),
        step === 2 && !!dataset && _react2.default.createElement(_step4.default, {
          dataset: dataset,
          wizard: wizard,
          onChange: function onChange(value) {
            _this7.onWizardChange(value);
          }
        }),
        step === 3 && !!dataset && _react2.default.createElement(_step6.default, {
          dataset: dataset,
          wizard: wizard,
          onChange: function onChange(value) {
            _this7.onFormChange(value);
          }
        }),
        !loading && _react2.default.createElement(_Navigation2.default, {
          step: step,
          stepLength: stepLength,
          submitting: submitting,
          onStepChange: function onStepChange(s) {
            return _this7.setStep(s);
          }
        })
      );
    }
  }]);

  return WidgetWizard;
}(_react2.default.Component);

WidgetWizard.propTypes = {
  dataset: _react2.default.PropTypes.string.isRequired,
  application: _react2.default.PropTypes.array,
  authorization: _react2.default.PropTypes.string
};

exports.default = WidgetWizard;