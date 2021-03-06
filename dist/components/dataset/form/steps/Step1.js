'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('../constants');

var _step = require('./step');

var _step2 = _interopRequireDefault(_step);

var _Field = require('../../../form/Field');

var _Field2 = _interopRequireDefault(_Field);

var _Input = require('../../../form/Input');

var _Input2 = _interopRequireDefault(_Input);

var _SelectInput = require('../../../form/SelectInput');

var _SelectInput2 = _interopRequireDefault(_SelectInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Step1 = function (_Step) {
  _inherits(Step1, _Step);

  function Step1(props) {
    _classCallCheck(this, Step1);

    var _this = _possibleConstructorReturn(this, (Step1.__proto__ || Object.getPrototypeOf(Step1)).call(this, props));

    _this.state = {
      dataset: props.dataset,
      form: props.form
    };

    // BINDINGS
    _this.onConnectorTypeChange = _this.onConnectorTypeChange.bind(_this);
    return _this;
  }

  _createClass(Step1, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ form: nextProps.form });
    }
  }, {
    key: 'onConnectorTypeChange',
    value: function onConnectorTypeChange(value) {
      var newObj = Object.assign({}, value, { provider: '' });
      this.props.onChange(newObj);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var provider = _constants.CONNECTOR_TYPES_DICTIONARY[this.state.form.connectorType];
      return _react2.default.createElement(
        'fieldset',
        { className: 'c-field-container' },
        !this.state.form.authorization && _react2.default.createElement(
          _Field2.default,
          {
            ref: function ref(c) {
              if (c) _constants.FORM_ELEMENTS.elements.step1.authorization = c;
            },
            onChange: function onChange(value) {
              return _this2.props.onChange({ authorization: value });
            },
            validations: ['required'],
            properties: {
              name: 'authorization',
              label: 'Authorization token',
              type: 'text',
              required: true,
              default: this.state.form.authorization || ''
            }
          },
          _Input2.default
        ),
        _react2.default.createElement(
          _Field2.default,
          {
            ref: function ref(c) {
              if (c) _constants.FORM_ELEMENTS.elements.step1.name = c;
            },
            onChange: function onChange(value) {
              return _this2.props.onChange({ name: value });
            },
            validations: ['required'],
            properties: {
              name: 'name',
              label: 'Title',
              type: 'text',
              required: true,
              default: this.state.form.name
            }
          },
          _Input2.default
        ),
        _react2.default.createElement(
          _Field2.default,
          {
            ref: function ref(c) {
              if (c) _constants.FORM_ELEMENTS.elements.step1.subtitle = c;
            },
            onChange: function onChange(value) {
              return _this2.props.onChange({ subtitle: value });
            },
            properties: {
              name: 'subtitle',
              label: 'Subtitle',
              type: 'text',
              default: this.state.form.subtitle
            }
          },
          _Input2.default
        ),
        _react2.default.createElement(
          _Field2.default,
          {
            ref: function ref(c) {
              if (c) _constants.FORM_ELEMENTS.elements.step1.connectorType = c;
            },
            onChange: function onChange(value) {
              return _this2.onConnectorTypeChange({ connectorType: value });
            },
            validations: ['required'],
            blank: true,
            options: _constants.CONNECTOR_TYPES,
            properties: {
              name: 'connectorType',
              label: 'Connector Type',
              default: this.state.form.connectorType,
              disabled: !!this.state.dataset,
              required: true
            }
          },
          _SelectInput2.default
        ),
        provider && _react2.default.createElement(
          _Field2.default,
          {
            ref: function ref(c) {
              if (c) _constants.FORM_ELEMENTS.elements.step1.provider = c;
            },
            onChange: function onChange(value) {
              return _this2.props.onChange({ provider: value });
            },
            validations: ['required'],
            blank: true,
            options: Object.keys(provider).map(function (key) {
              return {
                label: provider[key].label,
                value: provider[key].value
              };
            }),
            properties: {
              name: 'provider',
              label: 'Provider',
              default: this.state.form.provider,
              value: this.state.form.provider,
              disabled: !!this.state.dataset,
              required: true
            }
          },
          _SelectInput2.default
        )
      );
    }
  }]);

  return Step1;
}(_step2.default);

Step1.propTypes = {
  dataset: _react2.default.PropTypes.string,
  form: _react2.default.PropTypes.object,
  onChange: _react2.default.PropTypes.func
};

exports.default = Step1;