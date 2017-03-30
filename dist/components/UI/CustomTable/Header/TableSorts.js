'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Icon = require('../../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableFilters = function (_React$Component) {
  _inherits(TableFilters, _React$Component);

  function TableFilters(props) {
    _classCallCheck(this, TableFilters);

    var _this = _possibleConstructorReturn(this, (TableFilters.__proto__ || Object.getPrototypeOf(TableFilters)).call(this, props));

    _this.state = {
      sort: 1
    };
    return _this;
  }

  _createClass(TableFilters, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'button',
          { onClick: function onClick() {
              return _this2.props.onSort && _this2.props.onSort({ field: _this2.props.field, value: 1 });
            } },
          _react2.default.createElement(_Icon2.default, { name: 'icon-arrow-up', className: '-tiny' })
        ),
        _react2.default.createElement(
          'button',
          { onClick: function onClick() {
              return _this2.props.onSort && _this2.props.onSort({ field: _this2.props.field, value: -1 });
            } },
          _react2.default.createElement(_Icon2.default, { name: 'icon-arrow-down', className: '-tiny' })
        )
      );
    }
  }]);

  return TableFilters;
}(_react2.default.Component);

exports.default = TableFilters;


TableFilters.propTypes = {
  field: _react2.default.PropTypes.string.isRequired,
  onSort: _react2.default.PropTypes.func
};

TableFilters.defaultProps = {
  onChange: null,
  selected: null
};