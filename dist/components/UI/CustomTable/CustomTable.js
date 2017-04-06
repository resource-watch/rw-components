'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uniq = require('lodash/uniq');

var _uniq2 = _interopRequireDefault(_uniq);

var _flatten = require('lodash/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _TableHeader = require('./header/TableHeader');

var _TableHeader2 = _interopRequireDefault(_TableHeader);

var _TableContent = require('./content/TableContent');

var _TableContent2 = _interopRequireDefault(_TableContent);

var _TableFooter = require('./footer/TableFooter');

var _TableFooter2 = _interopRequireDefault(_TableFooter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomTable = function (_React$Component) {
  _inherits(CustomTable, _React$Component);

  _createClass(CustomTable, null, [{
    key: 'getColumnKeys',


    /**
     * STATIC METHODS
     * - getColumnKeys
     * - getColumnValues
     * - setTableData
    */
    value: function getColumnKeys(data) {
      return (0, _uniq2.default)((0, _flatten2.default)(data.map(function (d) {
        return Object.keys(d);
      })));
    }
  }, {
    key: 'getColumnValues',
    value: function getColumnValues(data) {
      var columnsKeys = CustomTable.getColumnKeys(data);
      var columns = {};
      columnsKeys.forEach(function (key) {
        var values = (0, _uniq2.default)(data.map(function (d) {
          return d[key];
        })).sort(function (a, b) {
          return a - b;
        }).map(function (d) {
          return d && d.toString();
        });
        columns[key] = values;
      });

      return columns;
    }
  }, {
    key: 'setTableData',
    value: function setTableData(props) {
      var data = props.data;

      return {
        // Data
        data: data,
        // Columns
        columnValues: CustomTable.getColumnValues(data)
      };
    }
  }]);

  function CustomTable(props) {
    _classCallCheck(this, CustomTable);

    var _this = _possibleConstructorReturn(this, (CustomTable.__proto__ || Object.getPrototypeOf(CustomTable)).call(this, props));

    _this.state = {
      pagination: props.pagination,
      sort: {},
      // Columns
      columnQueries: {},
      // Rows
      rowSelection: []
    };

    // Bindings
    _this.onChangePage = _this.onChangePage.bind(_this);
    _this.onFilter = _this.onFilter.bind(_this);
    _this.onSort = _this.onSort.bind(_this);

    _this.onRowDelete = _this.onRowDelete.bind(_this);
    _this.onToggleSelectedRow = _this.onToggleSelectedRow.bind(_this);
    return _this;
  }

  /**
   * COMPONENT LIFECYCLE
  */


  _createClass(CustomTable, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      this.setState(CustomTable.setTableData(this.props), function () {
        _this2.filter();
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      var currentLength = this.state.data.length;
      var currentColumnsKeys = CustomTable.getColumnKeys(this.state.data).sort();

      var nextLength = nextProps.data.length;
      var nextColumnsKeys = CustomTable.getColumnKeys(nextProps.data).sort();

      if (currentLength !== nextLength) {
        // TODO: check if the data has changed to reload all the data or only to filter it
        this.setState(CustomTable.setTableData(nextProps), function () {
          _this3.filter();
        });
      }

      if (!(0, _isEqual2.default)(currentColumnsKeys, nextColumnsKeys)) {
        this.setState(_extends({}, CustomTable.setTableData(nextProps), {
          // Sort
          sort: {},
          // Columns
          columnQueries: {},
          // Rows
          rowSelection: []
        }));
      }
    }

    /**
     * UI EVENTS
     * - onToggleSelectedRow
     * - onRowDelete
     * - onFilter
     * - onSort
     * - onChangePage
    */

  }, {
    key: 'onToggleSelectedRow',
    value: function onToggleSelectedRow(id) {
      var _this4 = this;

      var rowSelection = this.state.rowSelection.slice();
      var index = rowSelection.indexOf(id);

      // Toggle the active dataset
      if (index !== -1) {
        rowSelection.splice(index, 1);
      } else {
        rowSelection.push(id);
      }

      this.setState({ rowSelection: rowSelection }, function () {
        _this4.props.onToggleSelectedRow && _this4.props.onToggleSelectedRow(_this4.state.rowSelection);
      });
    }
  }, {
    key: 'onRowDelete',
    value: function onRowDelete(id) {
      var _this5 = this;

      var data = this.state.data.slice();
      var index = data.findIndex(function (row) {
        return row.id === id;
      });
      data.splice(index, 1);

      this.setState({
        // Data
        data: data,
        // Columns
        columnValues: CustomTable.getColumnValues(data)
      }, function () {
        _this5.filter();
        _this5.props.onRowDelete && _this5.props.onRowDelete(id);
      });
    }
  }, {
    key: 'onFilter',
    value: function onFilter(q) {
      var _this6 = this;

      var columnQueries = this.state.columnQueries;

      // Let's use null when you select all the values, so whenever you add more points to
      // the map they will be selected because you will remove the filter from the columnQueries
      if (q.value) {
        columnQueries = _extends({}, this.state.columnQueries, _defineProperty({}, q.field, q.value));
      } else {
        !!columnQueries[q.field] && delete columnQueries[q.field];
      }

      this.setState({
        columnQueries: columnQueries
      }, function () {
        _this6.filter();
        _this6.onChangePage(0);
      });
    }
  }, {
    key: 'onSort',
    value: function onSort(s) {
      var _this7 = this;

      var sort = {
        field: s.field,
        value: s.value
      };
      this.setState({
        sort: sort
      }, function () {
        return _this7.onChangePage(0);
      });
    }
  }, {
    key: 'onChangePage',
    value: function onChangePage(page) {
      this.setState({
        pagination: _extends({}, this.state.pagination, {
          page: page
        })
      });
    }

    /**
     * FILTER
     * - filter
    */

  }, {
    key: 'filter',
    value: function filter() {
      var _state = this.state,
          columnQueries = _state.columnQueries,
          pagination = _state.pagination;


      var filteredData = this.state.data.filter(function (row) {
        return Object.keys(columnQueries).map(function (field) {
          return columnQueries[field].map(function (val) {
            return row[field].toString().toLowerCase() === val.toString().toLowerCase();
          }).some(function (match) {
            return match;
          });
        }).every(function (match) {
          return match;
        });
      });

      var maxPage = Math.ceil(filteredData.length / pagination.pageSize);
      // Check if the page is equal to the total
      var page = pagination.page !== 0 && pagination.page === maxPage ? pagination.page - 1 : pagination.page;

      this.setState({
        filteredData: filteredData,
        pagination: _extends({}, pagination, {
          page: page,
          total: filteredData.length
        })
      });
    }

    /* Render */

  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'c-table' },
        _react2.default.createElement('div', { className: 'table-header' }),
        _react2.default.createElement(
          'table',
          { className: 'table' },
          _react2.default.createElement(_TableHeader2.default, {
            actions: this.props.actions,
            columns: this.props.columns,
            columnValues: this.state.columnValues,
            columnQueries: this.state.columnQueries,
            filteredData: this.state.filteredData,
            sort: this.state.sort,
            onFilter: this.onFilter,
            onSort: this.onSort
          }),
          _react2.default.createElement(_TableContent2.default, _extends({}, this.props, this.state, {
            onToggleSelectedRow: this.onToggleSelectedRow,
            onRowDelete: this.onRowDelete
          }))
        ),
        _react2.default.createElement(_TableFooter2.default, {
          pagination: this.state.pagination,
          onChangePage: this.onChangePage,
          showTotalPages: true
        })
      );
    }
  }]);

  return CustomTable;
}(_react2.default.Component);

/* Property typing */


exports.default = CustomTable;
CustomTable.propTypes = {
  actions: _react2.default.PropTypes.object,
  data: _react2.default.PropTypes.array,
  columns: _react2.default.PropTypes.array,
  pagination: _react2.default.PropTypes.object,
  onToggleSelectedRow: _react2.default.PropTypes.func,
  onRowDelete: _react2.default.PropTypes.func
};

/* Property default values */
CustomTable.defaultProps = {
  data: [],
  columns: [],
  pagination: {
    enabled: true,
    pageSize: 20,
    page: 0,
    total: null
  },
  actions: {
    show: true,
    list: [{ name: 'Edit', path: '#' }, { name: 'Remove', path: '#' }]
  },
  onToggleSelectedRow: null,
  onRowDelete: null
};