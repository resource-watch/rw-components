'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var classesDic = {
  status: {
    success: '-success',
    failed: '-failed',
    saved: '-saved',
    deleted: '-deleted',
    pending: '-pending'
  }
};

var StatusTD = function (_React$Component) {
  _inherits(StatusTD, _React$Component);

  function StatusTD() {
    _classCallCheck(this, StatusTD);

    return _possibleConstructorReturn(this, (StatusTD.__proto__ || Object.getPrototypeOf(StatusTD)).apply(this, arguments));
  }

  _createClass(StatusTD, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          value = _props.value,
          index = _props.index;

      var className = 'status ' + classesDic.status[value];
      return _react2.default.createElement(
        'td',
        {
          className: className,
          key: index
        },
        value
      );
    }
  }]);

  return StatusTD;
}(_react2.default.Component);

StatusTD.propTypes = {
  value: _react2.default.PropTypes.string,
  index: _react2.default.PropTypes.string
};

exports.default = StatusTD;