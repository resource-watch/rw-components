'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ButtonContainer = function (_React$Component) {
  _inherits(ButtonContainer, _React$Component);

  function ButtonContainer() {
    _classCallCheck(this, ButtonContainer);

    return _possibleConstructorReturn(this, (ButtonContainer.__proto__ || Object.getPrototypeOf(ButtonContainer)).apply(this, arguments));
  }

  _createClass(ButtonContainer, [{
    key: 'render',
    value: function render() {
      var containerClassName = (0, _classnames4.default)(_defineProperty({}, this.props.className, !!this.props.className));

      return _react2.default.createElement(
        'div',
        { className: 'c-button-container ' + containerClassName },
        _react2.default.createElement(
          'ul',
          null,
          this.props.buttons.map(function (button, i) {
            var buttonClassName = (0, _classnames4.default)(_defineProperty({}, button.className, !!button.className));
            return _react2.default.createElement(
              'li',
              { key: i },
              _react2.default.createElement(
                'a',
                {
                  className: 'c-button ' + buttonClassName,
                  href: button.path
                },
                button.label
              )
            );
          })
        )
      );
    }
  }]);

  return ButtonContainer;
}(_react2.default.Component);

ButtonContainer.propTypes = {
  buttons: _react2.default.PropTypes.array.isRequired,
  className: _react2.default.PropTypes.string
};

exports.default = ButtonContainer;