'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _esDecorators = require('es-decorators');

var _constants = require('./constants');

var _request = require('../../../utils/request');

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

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var MetadataForm = (_class = function (_React$Component) {
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
        authorization: props.authorization
      })
    });

    _this.state = newState;
    return _this;
  }

  _createClass(MetadataForm, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      if (this.state.datasetID) {
        // Start the loading
        this.setState({ loading: true });

        (0, _request.get)({
          url: 'https://api.resourcewatch.org/v1/dataset/' + this.state.datasetID + '/?includes=metadata&cache=' + Date.now(),
          headers: [{
            key: 'Content-Type',
            value: 'application/json'
          }],
          onSuccess: function onSuccess(response) {
            var metadata = response.data.attributes.metadata;

            _this2.setState({
              datasetName: response.data.attributes.name,
              form: metadata && metadata.length ? _this2.setFormFromParams(metadata[0].attributes) : _this2.state.form,
              metadata: metadata,
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

          // Check if the metadata alerady exists
          var isPresent = !!_this3.state.metadata.find(function (m) {
            var hasLang = m.attributes.language === _this3.state.form.language;
            var hasApp = m.attributes.application === _this3.state.form.application;

            return hasLang && hasApp;
          });

          (0, _request.post)({
            type: _this3.state.datasetID && isPresent ? 'PATCH' : 'POST',
            url: 'https://api.resourcewatch.org/v1/dataset/' + _this3.state.datasetID + '/metadata',
            body: _extends({
              application: _this3.state.form.application
            }, (0, _omit2.default)(_this3.state.form, ['authorization'])),
            headers: [{
              key: 'Content-Type',
              value: 'application/json'
            }, {
              key: 'Authorization',
              value: _this3.state.form.authorization
            }],
            onSuccess: function onSuccess() {
              var successMessage = 'Metadata has been uploaded correctly';
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
      var form = Object.assign({}, this.state.form, obj.form);
      this.setState({ form: form });
      console.info(form);
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
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

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
          !this.state.loading && _react2.default.createElement(_Step2.default, {
            onChange: function onChange(value) {
              return _this5.onChange(value);
            },
            form: this.state.form
          }),
          !this.state.loading && _react2.default.createElement(_Navigation2.default, {
            step: this.state.step,
            stepLength: this.state.stepLength,
            submitting: this.state.submitting,
            onBack: function onBack(step) {
              return _this5.onBack(step);
            }
          })
        )
      );
    }
  }]);

  return MetadataForm;
}(_react2.default.Component), (_applyDecoratedDescriptor(_class.prototype, 'onSubmit', [_esDecorators.Autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'onSubmit'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'onChange', [_esDecorators.Autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'onChange'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'onBack', [_esDecorators.Autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'onBack'), _class.prototype)), _class);


MetadataForm.propTypes = {
  dataset: _react2.default.PropTypes.string.isRequired,
  application: _react2.default.PropTypes.string.isRequired,
  authorization: _react2.default.PropTypes.string.isRequired,
  onSubmit: _react2.default.PropTypes.func
};

exports.default = MetadataForm;