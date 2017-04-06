'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = function (_React$Component) {
  _inherits(Table, _React$Component);

  function Table(props) {
    _classCallCheck(this, Table);

    var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

    _this.setTableData(props);

    // Bindings
    _this.nextPage = _this.nextPage.bind(_this);
    _this.prevPage = _this.prevPage.bind(_this);
    return _this;
  }

  /* Component lifecycle */


  _createClass(Table, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!(0, _isEqual2.default)(this.props.data, nextProps.data)) {
        this.setTableData(nextProps);
      }
    }

    /* Component api */

  }, {
    key: 'setTableData',
    value: function setTableData(props) {
      var data = props.data;

      /*
        Initial state
        - props.data => original data
        - filteredData => original data with filters and/or sort (if any) applied
      */

      this.state = {
        filteredData: data,
        currentPage: this.state && this.state.currentPage || 0,
        totalPages: Math.ceil(data.length / props.pageSize),
        query: {},
        sort: {}
      };
    }
  }, {
    key: 'getPageBounds',
    value: function getPageBounds(page) {
      var bottom = page * this.props.pageSize;
      var top = bottom + this.props.pageSize;
      return { bottom: bottom, top: top };
    }
  }, {
    key: 'nextPage',
    value: function nextPage() {
      if (this.state.currentPage === this.state.totalPages - 1) return;
      this.goToPage(this.state.currentPage + 1);
    }
  }, {
    key: 'prevPage',
    value: function prevPage() {
      if (this.state.currentPage === 0) return;
      this.goToPage(this.state.currentPage - 1);
    }
  }, {
    key: 'goToPage',
    value: function goToPage(page) {
      this.setState({
        currentPage: page
      });
    }

    /* Partial renders */

  }, {
    key: 'renderTableHead',
    value: function renderTableHead() {
      return _react2.default.createElement(
        'tr',
        null,
        this.props.columns.map(function (c, index) {
          return _react2.default.createElement(
            'th',
            { key: index },
            _react2.default.createElement(
              'span',
              { className: 'th-wrapper' },
              _react2.default.createElement(
                'span',
                null,
                c.name
              )
            )
          );
        }),
        this.props.actionsColumn ? _react2.default.createElement(
          'th',
          null,
          'Actions'
        ) : null
      );
    }
  }, {
    key: 'renderTableContent',
    value: function renderTableContent() {
      var _this2 = this;

      var filteredData = this.state.filteredData;

      var _getPageBounds = this.getPageBounds(this.state.currentPage),
          bottom = _getPageBounds.bottom,
          top = _getPageBounds.top;

      if (!filteredData.length) {
        return _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            { colSpan: this.props.columns.length },
            'No results found'
          )
        );
      }

      /* Apply pagination to filteredData */
      var paginatedData = filteredData.slice(bottom, top);

      return paginatedData.map(function (row, index) {
        return _react2.default.createElement(
          'tr',
          { key: index },
          _this2.props.columns.map(function (col, i) {
            return _react2.default.createElement(
              'td',
              { key: i, className: col.cellClasses ? col.cellClasses : '' },
              row[col.name]
            );
          }),
          _this2.props.actionsColumn ? _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement(
              'ul',
              { className: 'menu simple' },
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'a',
                  { href: '/datasets/' + row.id + '/edit' },
                  'Edit'
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'a',
                  { href: '/datasets/' + row.id + '/remove' },
                  'Remove'
                )
              )
            )
          ) : null
        );
      });
    }
  }, {
    key: 'renderTableFooter',
    value: function renderTableFooter() {
      return _react2.default.createElement(
        'div',
        { className: 'table-footer' },
        this.props.paginated && _react2.default.createElement(
          'ul',
          { className: 'pagination', role: 'navigation' },
          _react2.default.createElement(
            'li',
            { className: 'pagination-previous' },
            _react2.default.createElement(
              'button',
              { className: 'paginator-btn', onClick: this.prevPage },
              'Prev'
            )
          ),
          _react2.default.createElement(
            'li',
            { className: 'pagination-next' },
            _react2.default.createElement(
              'button',
              { className: 'paginator-btn', onClick: this.nextPage },
              'Next'
            )
          )
        ),
        this.props.paginated && _react2.default.createElement(
          'div',
          null,
          'Page ',
          _react2.default.createElement(
            'span',
            null,
            this.state.currentPage + 1
          ),
          ' of ',
          _react2.default.createElement(
            'span',
            null,
            this.state.totalPages
          )
        )
      );
    }

    /* Render */

  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'c-table' },
        _react2.default.createElement(
          'table',
          { className: 'table' },
          _react2.default.createElement(
            'thead',
            null,
            this.renderTableHead()
          ),
          _react2.default.createElement(
            'tbody',
            null,
            this.renderTableContent()
          )
        ),
        this.renderTableFooter()
      );
    }
  }]);

  return Table;
}(_react2.default.Component);

/* Property typing */


exports.default = Table;
Table.propTypes = {
  data: _react2.default.PropTypes.array,
  columns: _react2.default.PropTypes.array,
  actionsColumn: _react2.default.PropTypes.bool,
  editablePath: _react2.default.PropTypes.string,
  removablePath: _react2.default.PropTypes.string,
  paginated: _react2.default.PropTypes.bool,
  pageSize: _react2.default.PropTypes.number,
  initialPage: _react2.default.PropTypes.number
};

/* Property default values */
Table.defaultProps = {
  data: [],
  columns: [],
  actionsColumn: true,
  editablePath: '/datasets/:id/edit',
  removablePath: '/datasets/:id/remove',
  paginated: true,
  pageSize: 10,
  initialPage: 0
};