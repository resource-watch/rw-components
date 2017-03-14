'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_React$Component) {
  _inherits(Button, _React$Component);

  function Button(props) {
    _classCallCheck(this, Button);

    // BINDINGS
    var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

    _this.triggerClick = _this.triggerClick.bind(_this);
    _this.triggerMouseOver = _this.triggerMouseOver.bind(_this);
    _this.triggerMouseOut = _this.triggerMouseOut.bind(_this);
    return _this;
  }

  _createClass(Button, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        className: nextProps.className
      });
    }
  }, {
    key: 'triggerClick',
    value: function triggerClick(e) {
      this.props.onClick(e);
    }
  }, {
    key: 'triggerMouseOver',
    value: function triggerMouseOver(e) {
      this.props.onMouseOver(e);
    }
  }, {
    key: 'triggerMouseOut',
    value: function triggerMouseOut(e) {
      this.props.onMouseOut(e);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var properties = _props.properties;
      var onClick = _props.onClick;
      var onMouseOver = _props.onMouseOver;
      var onMouseOut = _props.onMouseOut;


      return _react2.default.createElement(
        'button',
        _extends({}, properties, {
          className: 'c-button ' + (properties.className || ''),
          onClick: onClick ? this.triggerClick : null,
          onMouseOver: onMouseOver ? this.triggerMouseOver : null,
          onMouseOut: onMouseOut ? this.triggerMouseOut : null
        }),
        children
      );
    }
  }]);

  return Button;
}(_react2.default.Component);

Button.propTypes = {
  children: _react2.default.PropTypes.any,
  properties: _react2.default.PropTypes.object,

  onClick: _react2.default.PropTypes.func,
  onMouseOver: _react2.default.PropTypes.func,
  onMouseOut: _react2.default.PropTypes.func
};

exports.default = Button;