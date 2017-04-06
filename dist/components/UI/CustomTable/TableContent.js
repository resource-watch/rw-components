'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableContent = function (_React$Component) {
  _inherits(TableContent, _React$Component);

  function TableContent() {
    _classCallCheck(this, TableContent);

    return _possibleConstructorReturn(this, (TableContent.__proto__ || Object.getPrototypeOf(TableContent)).apply(this, arguments));
  }

  _createClass(TableContent, [{
    key: 'getPageBounds',
    value: function getPageBounds() {
      var pagination = this.props.pagination;


      return {
        bottom: pagination.page * pagination.pageSize,
        top: pagination.page * pagination.pageSize + pagination.pageSize
      };
    }
  }, {
    key: 'setIndividualActionPath',
    value: function setIndividualActionPath(path, id) {
      return path.replace(':id', id);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          actions = _props.actions,
          columns = _props.columns,
          sort = _props.sort,
          rowSelection = _props.rowSelection;

      var _getPageBounds = this.getPageBounds(),
          bottom = _getPageBounds.bottom,
          top = _getPageBounds.top;

      var actionsShowed = actions.list.filter(function (ac) {
        return ac.show || ac.component;
      });

      var data = this.props.filteredData;

      if (!data.length) {
        return _react2.default.createElement(
          'tbody',
          null,
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'td',
              { colSpan: columns.length },
              'No results found'
            )
          )
        );
      }

      /* Apply sorting to data */
      if (!(0, _isEmpty2.default)(sort)) {
        data = data.slice().sort(function (rowA, rowB) {
          return rowA[sort.field].toString().toLowerCase() > rowB[sort.field].toString().toLowerCase() ? sort.value : sort.value * -1;
        });
      }

      /* Apply pagination to data */
      data = data.slice(bottom, top);

      return _react2.default.createElement(
        'tbody',
        null,
        data.map(function (row, index) {
          var selectedClass = (0, _classnames2.default)({ '-selected': rowSelection.includes(row.id) });

          return _react2.default.createElement(
            'tr',
            {
              className: '' + selectedClass
              // onClick={() => this.props.onToggleSelectedRow(row.id)}
              , key: index
            },
            columns.map(function (col, i) {
              var value = row[col.value];
              var td = col.td ? _react2.default.createElement(col.td, { key: i, value: value }) : _react2.default.createElement(
                'td',
                { key: i, className: col.className || '' },
                value
              );
              return td;
            }),
            actions.show && _react2.default.createElement(
              'td',
              { className: 'individual-actions' },
              _react2.default.createElement(
                'ul',
                null,
                actionsShowed.map(function (ac, j) {
                  if (ac.component) {
                    return _react2.default.createElement(
                      'li',
                      { key: j },
                      _react2.default.createElement(ac.component, _extends({}, ac.componentProps, {
                        href: _this2.setIndividualActionPath(ac.path, row.id),
                        data: row,
                        onRowDelete: _this2.props.onRowDelete,
                        onToggleSelectedRow: _this2.props.onToggleSelectedRow
                      }))
                    );
                  }
                  return _react2.default.createElement(
                    'li',
                    { key: j },
                    _react2.default.createElement(
                      'a',
                      { href: _this2.setIndividualActionPath(ac.path, row.id) },
                      ac.name
                    )
                  );
                })
              )
            )
          );
        })
      );
    }
  }]);

  return TableContent;
}(_react2.default.Component);

exports.default = TableContent;


TableContent.propTypes = {
  actions: _react2.default.PropTypes.object,
  columns: _react2.default.PropTypes.array,
  filteredData: _react2.default.PropTypes.array,
  pagination: _react2.default.PropTypes.object,
  rowSelection: _react2.default.PropTypes.array,
  sort: _react2.default.PropTypes.object,
  // FUNCTIONS
  onRowDelete: _react2.default.PropTypes.func,
  onToggleSelectedRow: _react2.default.PropTypes.func
};

TableContent.defaultProps = {
  actions: {},
  columns: [],
  filteredData: [],
  pagination: {},
  rowSelection: [],
  sort: {},
  // FUNCTIONS
  onRowDelete: null,
  onToggleSelectedRow: null
};