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

var _step = require('./steps/step-1');

var _step2 = _interopRequireDefault(_step);

var _step3 = require('./steps/step-2');

var _step4 = _interopRequireDefault(_step3);

var _step5 = require('./steps/step-3');

var _step6 = _interopRequireDefault(_step5);

var _step7 = require('./steps/step-4');

var _step8 = _interopRequireDefault(_step7);

var _step9 = require('./steps/step-5');

var _step10 = _interopRequireDefault(_step9);

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

    _this.state = _constants.STATE_DEFAULT;

    _this.onSubmit = _this.onSubmit.bind(_this);
    _this.onWizardChange = _this.onWizardChange.bind(_this);
    return _this;
  }

  /**
   * UI EVENTS
   * - onSubmit
   * - onWizardChange
  */


  _createClass(WidgetWizard, [{
    key: 'onWizardChange',
    value: function onWizardChange(obj) {
      var _this2 = this;

      var wizard = Object.assign({}, this.state.wizard, obj);
      this.setState({ wizard: wizard }, function () {
        return console.info(_this2.state.wizard);
      });
    }
  }, {
    key: 'onSubmit',
    value: function onSubmit(e) {
      var _this3 = this;

      if (e) e.preventDefault();

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
            // Send the request
            var xmlhttp = new XMLHttpRequest();
            var xmlhttpOptions = {
              type: _this3.state.dataset && _this3.state.widget ? 'PATCH' : 'POST',
              authorization: _this3.state.form.authorization,
              contentType: 'application/json',
              omit: ['authorization']
            };
            xmlhttp.open(xmlhttpOptions.type, 'https://api.resourcewatch.org/v1/dataset/' + _this3.state.dataset + '/widget/' + (_this3.state.widget || ''));
            xmlhttp.setRequestHeader('Content-Type', xmlhttpOptions.contentType);
            xmlhttp.setRequestHeader('Authorization', xmlhttpOptions.authorization);
            xmlhttp.send(JSON.stringify({
              // Remove unnecesary atributtes to prevent 'Unprocessable Entity error'
              widget: (0, _omit2.default)(_this3.state.form, xmlhttpOptions.omit)
            }));

            xmlhttp.onreadystatechange = function () {
              if (xmlhttp.readyState === 4) {
                // Stop the submitting
                _this3.setState({ submitting: false });

                if (xmlhttp.status === 200 || xmlhttp.status === 201) {
                  var response = JSON.parse(xmlhttp.responseText);
                  var successMessage = 'The widget "' + response.data.id + '" - "' + response.data.attributes.name + '" has been uploaded correctly';
                  console.info(response);
                  console.info(successMessage);
                  alert(successMessage);

                  // Go back to first step and set the dataset
                  // This will trigger the PATCH function
                  _this3.setState({
                    step: 1,
                    widget: response.data.id
                  });
                } else {
                  console.info('Error');
                }
              }
            };
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
      var _this4 = this;

      var form = Object.keys(this.state.form);
      var newForm = {};

      form.forEach(function (f) {
        if (params[f] || _this4.state.form[f]) {
          newForm[f] = params[f] || _this4.state.form[f];
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
      var _this5 = this;

      return _react2.default.createElement(
        'form',
        { className: 'c-form', onSubmit: this.onSubmit, noValidate: true },
        this.state.step === 1 && _react2.default.createElement(_step2.default, {
          ref: function ref(c) {
            _this5.step = c;
          },
          wizard: this.state.wizard,
          onChange: function onChange(value) {
            _this5.onWizardChange(value);
            _this5.onSubmit();
          }
        }),
        this.state.step === 2 && _react2.default.createElement(_step4.default, {
          ref: function ref(c) {
            _this5.step = c;
          },
          wizard: this.state.wizard,
          onChange: function onChange(value) {
            _this5.onWizardChange(value);
            _this5.onSubmit();
          }
        }),
        this.state.step === 3 && _react2.default.createElement(_step6.default, {
          ref: function ref(c) {
            _this5.step = c;
          },
          wizard: this.state.wizard,
          onChange: function onChange(value) {
            _this5.onWizardChange(value);
          }
        }),
        this.state.step === 4 && _react2.default.createElement(_step8.default, {
          ref: function ref(c) {
            _this5.step = c;
          },
          wizard: this.state.wizard,
          onChange: function onChange(value) {
            _this5.onWizardChange(value);
          }
        }),
        this.state.step === 5 && _react2.default.createElement(_step10.default, {
          ref: function ref(c) {
            _this5.step = c;
          },
          wizard: this.state.wizard,
          onChange: function onChange(value) {
            _this5.onWizardChange(value);
          }
        }),
        !this.state.loading && _react2.default.createElement(_Navigation2.default, {
          step: this.state.step,
          stepLength: this.state.stepLength,
          submitting: this.state.submitting,
          onBack: function onBack(step) {
            return _this5.setStep(step);
          }
        })
      );
    }
  }]);

  return WidgetWizard;
}(_react2.default.Component);

WidgetWizard.propTypes = {
  application: _react2.default.PropTypes.array,
  authorization: _react2.default.PropTypes.string
};

exports.default = WidgetWizard;