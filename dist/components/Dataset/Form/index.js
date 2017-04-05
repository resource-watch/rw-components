'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _request = require('../../../utils/request');

var _constants = require('./constants');

var _step = require('./Steps/step-1');

var _step2 = _interopRequireDefault(_step);

var _step3 = require('./Steps/step-2');

var _step4 = _interopRequireDefault(_step3);

var _Navigation = require('../../Form/Navigation');

var _Navigation2 = _interopRequireDefault(_Navigation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatasetForm = function (_React$Component) {
  _inherits(DatasetForm, _React$Component);

  function DatasetForm(props) {
    _classCallCheck(this, DatasetForm);

    var _this = _possibleConstructorReturn(this, (DatasetForm.__proto__ || Object.getPrototypeOf(DatasetForm)).call(this, props));

    _this.state = Object.assign({}, _constants.STATE_DEFAULT, {
      dataset: props.dataset,
      form: Object.assign({}, _constants.STATE_DEFAULT.form, {
        application: props.application,
        authorization: props.authorization
      })
    });

    // BINDINGS
    _this.onSubmit = _this.onSubmit.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    _this.onStepChange = _this.onStepChange.bind(_this);
    return _this;
  }

  _createClass(DatasetForm, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      if (this.state.dataset) {
        // Start the loading
        this.setState({ loading: true });

        (0, _request.get)({
          url: 'https://api.resourcewatch.org/v1/dataset/' + this.state.dataset,
          headers: [{
            key: 'Content-Type',
            value: 'application/json'
          }],
          onSuccess: function onSuccess(response) {
            _this2.setState({
              dataset: response.data.id,
              form: _this2.setFormFromParams(response.data.attributes),
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
      this.step.validate();

      // Set a timeout due to the setState function of react
      setTimeout(function () {
        var valid = _this3.step.isValid();
        if (valid) {
          if (_this3.state.step === _this3.state.stepLength && !_this3.state.submitting) {
            // Start the submitting
            _this3.setState({ submitting: true });

            // Set the request
            var requestOptions = {
              type: _this3.state.dataset ? 'PATCH' : 'POST',
              omit: _this3.state.dataset ? ['connectorUrlHint', 'authorization', 'connectorType', 'provider'] : ['connectorUrlHint', 'authorization']
            };

            (0, _request.post)({
              type: requestOptions.type,
              url: 'https://api.resourcewatch.org/v1/dataset/' + _this3.state.dataset,
              body: (0, _omit2.default)(_this3.state.form, requestOptions.omit),
              headers: [{
                key: 'Content-Type', value: 'application/json'
              }, {
                key: 'Authorization', value: _this3.state.form.authorization
              }],
              onSuccess: function onSuccess(response) {
                var successMessage = 'The dataset "' + response.data.id + '" - "' + response.data.attributes.name + '" has been uploaded correctly';
                console.info(response);
                console.info(successMessage);
                alert(successMessage);

                // Go back to first step and set the dataset
                // This will trigger the PATCH function
                _this3.setState({
                  submitting: false,
                  step: 1,
                  dataset: response.data.id
                });
              },
              onError: function onError(error) {
                _this3.setState({ submitting: false });
                console.error(error);
              }
            });
          } else {
            _this3.setState({
              step: _this3.state.step + 1
            }, function () {
              return console.info(_this3.state);
            });
          }
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
    key: 'onStepChange',
    value: function onStepChange(step) {
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
        this.state.step === 1 && !this.state.loading && _react2.default.createElement(_step2.default, {
          ref: function ref(c) {
            _this6.step = c;
          },
          onChange: function onChange(value) {
            return _this6.onChange(value);
          },
          form: this.state.form,
          dataset: this.state.dataset
        }),
        this.state.step === 2 && !this.state.loading && _react2.default.createElement(_step4.default, {
          ref: function ref(v) {
            _this6.step = v;
          },
          onChange: function onChange(value) {
            return _this6.onChange(value);
          },
          form: this.state.form,
          dataset: this.state.dataset
        }),
        !this.state.loading && _react2.default.createElement(_Navigation2.default, {
          step: this.state.step,
          stepLength: this.state.stepLength,
          submitting: this.state.submitting,
          onStepChange: this.onStepChange
        })
      );
    }
  }]);

  return DatasetForm;
}(_react2.default.Component);

DatasetForm.propTypes = {
  application: _react2.default.PropTypes.array,
  authorization: _react2.default.PropTypes.string,
  dataset: _react2.default.PropTypes.string
};

exports.default = DatasetForm;