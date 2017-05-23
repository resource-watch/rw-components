'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('../constants');

var _Field = require('../../../form/Field');

var _Field2 = _interopRequireDefault(_Field);

var _Input = require('../../../form/Input');

var _Input2 = _interopRequireDefault(_Input);

var _TextArea = require('../../../form/TextArea');

var _TextArea2 = _interopRequireDefault(_TextArea);

var _Code = require('../../../form/Code');

var _Code2 = _interopRequireDefault(_Code);

var _Checkbox = require('../../../form/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Step1 = function (_React$Component) {
  _inherits(Step1, _React$Component);

  function Step1() {
    _classCallCheck(this, Step1);

    return _possibleConstructorReturn(this, (Step1.__proto__ || Object.getPrototypeOf(Step1)).apply(this, arguments));
  }

  _createClass(Step1, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'fieldset',
        { className: 'c-field-container' },
        !this.props.form.authorization && _react2.default.createElement(
          _Field2.default,
          {
            ref: function ref(c) {
              if (c) _constants.FORM_ELEMENTS.elements.authorization = c;
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
              default: this.props.form.authorization || ''
            }
          },
          _Input2.default
        ),
        _react2.default.createElement(
          _Field2.default,
          {
            ref: function ref(c) {
              if (c) _constants.FORM_ELEMENTS.elements.name = c;
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
              default: this.props.form.name
            }
          },
          _Input2.default
        ),
        _react2.default.createElement(
          _Field2.default,
          {
            ref: function ref(c) {
              if (c) _constants.FORM_ELEMENTS.elements.queryUrl = c;
            },
            onChange: function onChange(value) {
              return _this2.props.onChange({ queryUrl: value });
            },
            validations: ['required'],
            properties: {
              name: 'queryUrl',
              label: 'Query url',
              type: 'text',
              required: true,
              default: this.props.form.queryUrl
            }
          },
          _Input2.default
        ),
        _react2.default.createElement(
          _Field2.default,
          {
            ref: function ref(c) {
              if (c) _constants.FORM_ELEMENTS.elements.description = c;
            },
            onChange: function onChange(value) {
              return _this2.props.onChange({ description: value });
            },
            properties: {
              name: 'description',
              label: 'Description',
              type: 'textarea',
              rows: '6',
              default: this.props.form.description
            }
          },
          _TextArea2.default
        ),
        _react2.default.createElement(
          _Field2.default,
          {
            ref: function ref(c) {
              if (c) _constants.FORM_ELEMENTS.elements.authors = c;
            },
            onChange: function onChange(value) {
              return _this2.props.onChange({ authors: value });
            },
            properties: {
              name: 'authors',
              label: 'Authors',
              type: 'text',
              default: this.props.form.authors
            }
          },
          _Input2.default
        ),
        _react2.default.createElement(
          _Field2.default,
          {
            ref: function ref(c) {
              if (c) _constants.FORM_ELEMENTS.elements.source = c;
            },
            onChange: function onChange(value) {
              return _this2.props.onChange({ source: value });
            },
            properties: {
              name: 'source',
              label: 'Source',
              type: 'text',
              default: this.props.form.source
            }
          },
          _Input2.default
        ),
        _react2.default.createElement(
          _Field2.default,
          {
            ref: function ref(c) {
              if (c) _constants.FORM_ELEMENTS.elements.sourceUrl = c;
            },
            onChange: function onChange(value) {
              return _this2.props.onChange({ sourceUrl: value });
            },
            validations: ['url'],
            properties: {
              name: 'sourceUrl',
              label: 'Source url',
              type: 'text',
              default: this.props.form.sourceUrl
            }
          },
          _Input2.default
        ),
        _react2.default.createElement(
          _Field2.default,
          {
            ref: function ref(c) {
              if (c) _constants.FORM_ELEMENTS.elements.widgetConfig = c;
            },
            onChange: function onChange(value) {
              return _this2.props.onChange({ widgetConfig: value });
            },
            properties: {
              name: 'widgetConfig',
              label: 'Widget config',
              type: 'textarea',
              default: this.props.form.widgetConfig
            }
          },
          _Code2.default
        ),
        _react2.default.createElement(
          _Field2.default,
          {
            ref: function ref(c) {
              if (c) _constants.FORM_ELEMENTS.elements.default = c;
            },
            onChange: function onChange(value) {
              return _this2.props.onChange({ default: value.checked });
            },
            validations: ['required'],
            properties: {
              name: 'default',
              label: 'Default',
              value: 'default',
              title: 'Do you want to set this widget as the default one. (Only one default widget per dataset is allowed at a time)',
              checked: this.props.form.default
            }
          },
          _Checkbox2.default
        )
      );
    }
  }]);

  return Step1;
}(_react2.default.Component);

Step1.propTypes = {
  form: _react2.default.PropTypes.object,
  onChange: _react2.default.PropTypes.func
};

exports.default = Step1;