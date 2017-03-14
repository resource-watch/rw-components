'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Title;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Title(_ref) {
  var children = _ref.children,
      className = _ref.className;

  return _react2.default.createElement(
    'div',
    { className: 'c-title ' + (className || '') },
    children
  );
}

Title.propTypes = {
  children: _react2.default.PropTypes.any,
  className: _react2.default.PropTypes.string
};