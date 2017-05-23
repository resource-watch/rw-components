'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _constants = require('./constants');

var _request = require('../../../utils/request');

var _Step = require('./steps/Step1');

var _Step2 = _interopRequireDefault(_Step);

var _Navigation = require('../../form/Navigation');

var _Navigation2 = _interopRequireDefault(_Navigation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WidgetForm = function (_React$Component) {
  _inherits(WidgetForm, _React$Component);

  function WidgetForm(props) {
    _classCallCheck(this, WidgetForm);

    var _this = _possibleConstructorReturn(this, (WidgetForm.__proto__ || Object.getPrototypeOf(WidgetForm)).call(this, props));

    _this.state = Object.assign({}, _constants.STATE_DEFAULT, {
      dataset: props.dataset,
      widget: props.widget,
      form: Object.assign({}, _constants.STATE_DEFAULT.form, {
        application: props.application,
        authorization: props.authorization
      })
    });

    _this.onSubmit = _this.onSubmit.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(WidgetForm, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      if (this.state.dataset && this.state.widget) {
        // Start the loading
        this.setState({ loading: true });

        (0, _request.get)({
          url: 'https://api.resourcewatch.org/v1/dataset/' + this.state.dataset + '/widget/' + this.state.widget + '?cache=' + Date.now(),
          headers: [{
            key: 'Content-Type',
            value: 'application/json'
          }],
          onSuccess: function onSuccess(response) {
            _this2.setState({
              form: _this2.setFormFromParams((0, _omit2.default)(response.data.attributes, ['status', 'published', 'verified'])),
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
     * - onSubmit
     * - onChange
    */

  }, {
    key: 'onSubmit',
    value: function onSubmit(event) {
      var _this3 = this;

      event.preventDefault();

      // Validate the form
      _constants.FORM_ELEMENTS.validate();

      // Set a timeout due to the setState function of react
      setTimeout(function () {
        var valid = _constants.FORM_ELEMENTS.isValid();

        if (valid) {
          // Start the submitting
          _this3.setState({ submitting: true });

          (0, _request.post)({
            type: _this3.state.dataset && _this3.state.widget ? 'PATCH' : 'POST',
            url: 'https://api.resourcewatch.org/v1/dataset/' + _this3.state.dataset + '/widget/' + (_this3.state.widget || ''),
            body: (0, _omit2.default)(_this3.state.form, ['authorization']),
            headers: [{
              key: 'Content-Type',
              value: 'application/json'
            }, {
              key: 'Authorization',
              value: _this3.state.form.authorization
            }],
            onSuccess: function onSuccess() {
              var successMessage = 'Widget has been uploaded correctly';
              alert(successMessage);

              _this3.props.onSubmit && _this3.props.onSubmit();
            },
            onError: function onError(error) {
              _this3.setState({ loading: false });
              console.error(error);
            }
          });
        }
      }, 0);
    }
  }, {
    key: 'onChange',
    value: function onChange(obj) {
      var _this4 = this;

      var form = Object.assign({}, this.state.form, obj);
      this.setState({ form: form }, function () {
        return console.info(_this4.state.form);
      });
    }
  }, {
    key: 'onBack',
    value: function onBack(step) {
      this.setState({ step: step });
    }

    // HELPERS

  }, {
    key: 'setFormFromParams',
    value: function setFormFromParams(params) {
      var _this5 = this;

      var form = Object.keys(this.state.form);
      var newForm = {};

      form.forEach(function (f) {
        if (params[f] || _this5.state.form[f]) {
          newForm[f] = params[f] || _this5.state.form[f];
        }
      });

      return newForm;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      return _react2.default.createElement(
        'form',
        { className: 'c-form', onSubmit: this.onSubmit, noValidate: true },
        this.state.loading && 'loading',
        this.state.step === 1 && !this.state.loading && _react2.default.createElement(_Step2.default, {
          ref: function ref(c) {
            _this6.step = c;
          },
          onChange: function onChange(value) {
            return _this6.onChange(value);
          },
          form: this.state.form
        }),
        !this.state.loading && _react2.default.createElement(_Navigation2.default, {
          step: this.state.step,
          stepLength: this.state.stepLength,
          submitting: this.state.submitting,
          onBack: function onBack(step) {
            return _this6.onBack(step);
          }
        })
      );
    }
  }]);

  return WidgetForm;
}(_react2.default.Component);

WidgetForm.propTypes = {
  application: _react2.default.PropTypes.array,
  authorization: _react2.default.PropTypes.string,
  dataset: _react2.default.PropTypes.string.isRequired,
  widget: _react2.default.PropTypes.string,
  onSubmit: _react2.default.PropTypes.func
};

exports.default = WidgetForm;