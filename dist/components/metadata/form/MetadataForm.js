'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _constants = require('./constants');

var _Step = require('./steps/Step1');

var _Step2 = _interopRequireDefault(_Step);

var _Title = require('../../ui/Title');

var _Title2 = _interopRequireDefault(_Title);

var _Navigation = require('../../form/Navigation');

var _Navigation2 = _interopRequireDefault(_Navigation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MetadataForm = function (_React$Component) {
  _inherits(MetadataForm, _React$Component);

  function MetadataForm(props) {
    _classCallCheck(this, MetadataForm);

    var _this = _possibleConstructorReturn(this, (MetadataForm.__proto__ || Object.getPrototypeOf(MetadataForm)).call(this, props));

    var newState = Object.assign({}, _constants.STATE_DEFAULT, {
      datasetID: props.dataset,
      datasetName: '',
      metadata: [],
      form: Object.assign({}, _constants.STATE_DEFAULT.form, {
        application: props.application,
        authorization: props.authorization,
        language: props.language
      })
    });

    _this.state = newState;

    _this.onSubmit = _this.onSubmit.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(MetadataForm, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      if (this.state.datasetID) {
        // Start the loading
        this.setState({ loading: true });

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', 'https://api.resourcewatch.org/v1/dataset/' + this.state.datasetID + '/?includes=metadata&cache=' + Date.now());
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.setRequestHeader('Authorization', this.state.form.authorization);
        xmlhttp.send();

        xmlhttp.onreadystatechange = function () {
          if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200 || xmlhttp.status === 201) {
              var response = JSON.parse(xmlhttp.responseText);
              _this2.setState({
                datasetName: response.data.attributes.name,
                metadata: response.data.attributes.metadata && response.data.attributes.metadata.length ? response.data.attributes.metadata[0].attributes : _constants.STATE_DEFAULT.metadata,
                // Stop the loading
                loading: false
              });
            } else {
              console.info('Error');
            }
          }
        };
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
            // Send the request
            var xmlhttp = new XMLHttpRequest();
            var xmlhttpOptions = {
              type: _this3.state.datasetID && _this3.state.metadata.status ? 'PATCH' : 'POST',
              authorization: _this3.state.form.authorization,
              contentType: 'application/json',
              omit: ['authorization']
            };

            xmlhttp.open(xmlhttpOptions.type, 'https://api.resourcewatch.org/v1/dataset/' + _this3.state.datasetID + '/metadata');
            xmlhttp.setRequestHeader('Content-Type', xmlhttpOptions.contentType);
            xmlhttp.setRequestHeader('Authorization', xmlhttpOptions.authorization);
            var body = JSON.stringify(_extends({
              language: _this3.state.form.language,
              application: _this3.state.form.application
            }, (0, _omit2.default)(_this3.state.metadata, xmlhttpOptions.omit)));
            xmlhttp.send(body);

            xmlhttp.onreadystatechange = function () {
              if (xmlhttp.readyState === 4) {
                // Stop the submitting
                _this3.setState({ submitting: false });

                if (xmlhttp.status === 200 || xmlhttp.status === 201) {
                  var response = JSON.parse(xmlhttp.responseText);
                  var successMessage = 'Metadata has been uploaded correctly';
                  console.info(response);
                  console.info(successMessage);
                  alert(successMessage);
                } else {
                  console.info('Error', xmlhttp);
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
  }, {
    key: 'onChange',
    value: function onChange(obj) {
      var metadata = Object.assign({}, this.state.metadata, obj.metadata);
      this.setState({ metadata: metadata });
    }
  }, {
    key: 'onBack',
    value: function onBack(step) {
      this.setState({ step: step });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _Title2.default,
          { className: '-big' },
          this.state.datasetName
        ),
        _react2.default.createElement(
          'form',
          { className: 'c-form', onSubmit: this.onSubmit, noValidate: true },
          this.state.loading && 'loading',
          this.state.step === 1 && !this.state.loading && _react2.default.createElement(_Step2.default, {
            ref: function ref(c) {
              _this4.step = c;
            },
            onChange: function onChange(value) {
              return _this4.onChange(value);
            },
            metadata: this.state.metadata
          }),
          !this.state.loading && _react2.default.createElement(_Navigation2.default, {
            step: this.state.step,
            stepLength: this.state.stepLength,
            submitting: this.state.submitting,
            onBack: function onBack(step) {
              return _this4.onBack(step);
            }
          })
        )
      );
    }
  }]);

  return MetadataForm;
}(_react2.default.Component);

MetadataForm.propTypes = {
  application: _react2.default.PropTypes.string,
  authorization: _react2.default.PropTypes.string,
  language: _react2.default.PropTypes.string,
  dataset: _react2.default.PropTypes.string.isRequired
};

exports.default = MetadataForm;