'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TableHeaderActions = require('./TableHeaderActions');

var _TableHeaderActions2 = _interopRequireDefault(_TableHeaderActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableHeader = function (_React$Component) {
  _inherits(TableHeader, _React$Component);

  function TableHeader() {
    _classCallCheck(this, TableHeader);

    return _possibleConstructorReturn(this, (TableHeader.__proto__ || Object.getPrototypeOf(TableHeader)).apply(this, arguments));
  }

  _createClass(TableHeader, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          actions = _props.actions,
          columns = _props.columns,
          columnValues = _props.columnValues,
          columnQueries = _props.columnQueries,
          sort = _props.sort,
          onFilter = _props.onFilter,
          onSort = _props.onSort;

      var actionsShowed = actions.list.filter(function (a) {
        return a.show;
      });

      return _react2.default.createElement(
        'thead',
        null,
        _react2.default.createElement(
          'tr',
          null,
          columns.map(function (c, index) {
            return _react2.default.createElement(
              'th',
              { key: index, className: c.type || '' },
              _react2.default.createElement(
                'span',
                { className: 'th-wrapper' },
                _react2.default.createElement(
                  'span',
                  null,
                  c.label
                ),
                _react2.default.createElement(_TableHeaderActions2.default, {
                  field: c.value,
                  values: columnValues[c.value],
                  selected: columnQueries[c.value],
                  sort: sort,
                  onFilter: onFilter,
                  onSort: onSort
                })
              )
            );
          }),
          actions.show && actionsShowed.length && _react2.default.createElement('th', { colSpan: '' + actionsShowed.length })
        )
      );
    }
  }]);

  return TableHeader;
}(_react2.default.Component);

exports.default = TableHeader;


TableHeader.propTypes = {
  actions: _react2.default.PropTypes.object,
  columns: _react2.default.PropTypes.array,
  columnValues: _react2.default.PropTypes.object,
  columnQueries: _react2.default.PropTypes.object,
  filteredData: _react2.default.PropTypes.array,
  sort: _react2.default.PropTypes.object,
  onFilter: _react2.default.PropTypes.func,
  onSort: _react2.default.PropTypes.func
};

TableHeader.defaultProps = {
  columns: [],
  columnValues: {},
  columnQueries: {},
  filteredData: [],
  onFilter: null,
  onSort: null
};