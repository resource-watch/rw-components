'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Icon = require('../ui/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _FormElement2 = require('./FormElement');

var _FormElement3 = _interopRequireDefault(_FormElement2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Checkbox = function (_FormElement) {
  _inherits(Checkbox, _FormElement);

  function Checkbox() {
    _classCallCheck(this, Checkbox);

    return _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).apply(this, arguments));
  }

  _createClass(Checkbox, [{
    key: 'triggerChange',

    /**
     * UI EVENTS
     * - triggerChange
    */
    value: function triggerChange(evt) {
      var value = this.props.properties.value;


      this.props.onChange && this.props.onChange({
        value: value,
        checked: evt.currentTarget.checked
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props$properties = this.props.properties,
          name = _props$properties.name,
          value = _props$properties.value,
          title = _props$properties.title,
          className = _props$properties.className;

      var customClassName = (0, _classnames3.default)(_defineProperty({}, className, !!className));

      return _react2.default.createElement(
        'div',
        { className: 'c-checkbox ' + customClassName },
        _react2.default.createElement('input', _extends({}, this.props.properties, {
          type: 'checkbox',
          id: 'checkbox-' + name + '-' + value,
          onChange: this.triggerChange
        })),
        _react2.default.createElement(
          'label',
          { htmlFor: 'checkbox-' + name + '-' + value },
          _react2.default.createElement(
            'span',
            { className: 'checkbox-icon' },
            _react2.default.createElement(_Icon2.default, { name: 'icon-checkbox' })
          ),
          _react2.default.createElement(
            'span',
            { className: 'item-title' },
            title
          )
        )
      );
    }
  }]);

  return Checkbox;
}(_FormElement3.default);

exports.default = Checkbox;


Checkbox.propTypes = {
  properties: _react2.default.PropTypes.object,
  onChange: _react2.default.PropTypes.func
};