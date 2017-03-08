'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Spinner(_ref) {
  var isLoading = _ref.isLoading,
      className = _ref.className,
      style = _ref.style;

  var loading = isLoading ? '-loading' : '';
  return _react2.default.createElement(
    'div',
    { className: 'c-spinner ' + loading + ' ' + className },
    _react2.default.createElement(
      'div',
      { className: 'spinner-box', style: style },
      _react2.default.createElement('div', { className: 'icon' })
    )
  );
}

Spinner.propTypes = {
  isLoading: _react2.default.PropTypes.bool,
  className: _react2.default.PropTypes.string,
  style: _react2.default.PropTypes.object
};

exports.default = Spinner;