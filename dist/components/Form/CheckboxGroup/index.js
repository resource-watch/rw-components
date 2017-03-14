'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormElement2 = require('../FormElement');

var _FormElement3 = _interopRequireDefault(_FormElement2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckboxGroup = function (_FormElement) {
  _inherits(CheckboxGroup, _FormElement);

  function CheckboxGroup(props) {
    _classCallCheck(this, CheckboxGroup);

    var _this = _possibleConstructorReturn(this, (CheckboxGroup.__proto__ || Object.getPrototypeOf(CheckboxGroup)).call(this, props));

    _this.state = {
      value: props.properties.default || []
    };
    return _this;
  }

  /**
   * UI EVENTS
   * - triggerChange
  */


  _createClass(CheckboxGroup, [{
    key: 'triggerChange',
    value: function triggerChange(e) {
      var _this2 = this;

      // - newSelected: Clone the current value array
      // - i: Get the indexOf the the current selection
      var newSelected = [].concat(this.state.value);
      var i = this.state.value.indexOf(e.currentTarget.value);

      // Toggle element from the array
      if (i === -1) {
        newSelected.push(e.currentTarget.value);
      } else {
        newSelected.splice(i, 1);
      }

      // Set state
      this.setState({
        value: newSelected
      }, function () {
        // Trigger validation
        _this2.triggerValidate();

        if (_this2.props.onChange) _this2.props.onChange(_this2.state.value);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          properties = _props.properties,
          options = _props.options;
      var value = this.state.value;


      return _react2.default.createElement(
        'div',
        { className: 'c-checkbox-box ' + this.props.className },
        options.map(function (item, i) {
          return _react2.default.createElement(
            'div',
            { key: i, className: 'c-checkbox' },
            _react2.default.createElement('input', _extends({}, properties, {
              type: 'checkbox',
              name: name,
              id: 'checkbox-' + name + '-' + item.value,
              value: item.value,
              checked: value.indexOf(item.value) !== -1,
              onChange: _this3.triggerChange
            })),
            _react2.default.createElement(
              'label',
              { htmlFor: 'checkbox-' + name + '-' + item.value },
              _react2.default.createElement('span', null),
              item.label
            )
          );
        })
      );
    }
  }]);

  return CheckboxGroup;
}(_FormElement3.default);

CheckboxGroup.propTypes = {
  options: _react2.default.PropTypes.array.isRequired,
  properties: _react2.default.PropTypes.object.isRequired,
  className: _react2.default.PropTypes.string,
  onChange: _react2.default.PropTypes.func
};

exports.default = CheckboxGroup;