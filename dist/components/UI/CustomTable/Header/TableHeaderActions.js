'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TableFilters = require('./TableFilters');

var _TableFilters2 = _interopRequireDefault(_TableFilters);

var _TableSorts = require('./TableSorts');

var _TableSorts2 = _interopRequireDefault(_TableSorts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableHeaderActions = function (_React$Component) {
  _inherits(TableHeaderActions, _React$Component);

  function TableHeaderActions() {
    _classCallCheck(this, TableHeaderActions);

    return _possibleConstructorReturn(this, (TableHeaderActions.__proto__ || Object.getPrototypeOf(TableHeaderActions)).apply(this, arguments));
  }

  _createClass(TableHeaderActions, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'c-table-header-actions' },
        _react2.default.createElement(
          'ul',
          null,
          _react2.default.createElement(
            'li',
            { className: 'action sortby-action' },
            _react2.default.createElement(_TableSorts2.default, this.props)
          ),
          _react2.default.createElement(
            'li',
            { className: 'action filter-action' },
            _react2.default.createElement(_TableFilters2.default, this.props)
          )
        )
      );
    }
  }]);

  return TableHeaderActions;
}(_react2.default.Component);

exports.default = TableHeaderActions;


TableHeaderActions.propTypes = {
  field: _react2.default.PropTypes.string.isRequired,
  values: _react2.default.PropTypes.array,
  selected: _react2.default.PropTypes.array,
  onFilter: _react2.default.PropTypes.func,
  onSort: _react2.default.PropTypes.func
};

TableHeaderActions.defaultProps = {
  onChange: null,
  selected: null
};