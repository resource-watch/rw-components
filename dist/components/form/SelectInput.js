'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _FormElement2 = require('./FormElement');

var _FormElement3 = _interopRequireDefault(_FormElement2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectInput = function (_FormElement) {
  _inherits(SelectInput, _FormElement);

  function SelectInput() {
    _classCallCheck(this, SelectInput);

    return _possibleConstructorReturn(this, (SelectInput.__proto__ || Object.getPrototypeOf(SelectInput)).apply(this, arguments));
  }

  _createClass(SelectInput, [{
    key: 'triggerChange',


    /**
     * UI EVENTS
     * - triggerChange
    */
    value: function triggerChange(selected) {
      var _this2 = this;

      var value = void 0;

      if (Array.isArray(selected)) {
        value = selected ? selected.map(function (s) {
          return s.value;
        }) : null;
      } else {
        value = selected ? selected.value : null;
      }

      this.setState({ value: value }, function () {
        // Trigger validation
        _this2.triggerValidate();
        // Publish the new value to the form
        if (_this2.props.onChange) _this2.props.onChange(_this2.state.value);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          options = _props.options,
          properties = _props.properties,
          creatable = _props.creatable;


      if (creatable) {
        return _react2.default.createElement(_reactSelect.Select, _extends({}, properties, {
          options: options,
          id: 'select-' + properties.name,
          value: this.state.value,
          onChange: this.triggerChange
        }));
      } else {
        return _react2.default.createElement(_reactSelect.Creatable, _extends({}, properties, {
          options: options,
          id: 'select-' + properties.name,
          value: this.state.value,
          onChange: this.triggerChange
        }));
      }
    }
  }]);

  return SelectInput;
}(_FormElement3.default);

SelectInput.propTypes = {
  properties: _react2.default.PropTypes.object.isRequired,
  options: _react2.default.PropTypes.array.isRequired,
  creatable: _react2.default.PropTypes.bool,
  onChange: _react2.default.PropTypes.func
};

exports.default = SelectInput;