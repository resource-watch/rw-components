'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Paginator = require('../../Paginator');

var _Paginator2 = _interopRequireDefault(_Paginator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableFooter = function (_React$Component) {
  _inherits(TableFooter, _React$Component);

  function TableFooter() {
    _classCallCheck(this, TableFooter);

    return _possibleConstructorReturn(this, (TableFooter.__proto__ || Object.getPrototypeOf(TableFooter)).apply(this, arguments));
  }

  _createClass(TableFooter, [{
    key: 'onChangePage',


    // UI EVENTS
    // - onChangePage
    value: function onChangePage(page) {
      this.props.onChangePage && this.props.onChangePage(page - 1);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          pagination = _props.pagination,
          showTotalPages = _props.showTotalPages;

      var maxPage = Math.ceil(pagination.total / pagination.pageSize) || 1;

      return _react2.default.createElement(
        'div',
        { className: 'table-footer' },
        _react2.default.createElement(_Paginator2.default, {
          options: {
            page: pagination.page + 1,
            size: pagination.total,
            limit: pagination.pageSize
          },
          onChange: function onChange(page) {
            return _this2.onChangePage(page);
          }
        }),
        pagination.enabled && showTotalPages && _react2.default.createElement(
          'div',
          null,
          'Page ',
          _react2.default.createElement(
            'span',
            null,
            pagination.page + 1
          ),
          ' of ',
          _react2.default.createElement(
            'span',
            null,
            maxPage
          )
        )
      );
    }
  }]);

  return TableFooter;
}(_react2.default.Component);

exports.default = TableFooter;


TableFooter.propTypes = {
  pagination: _react2.default.PropTypes.object,
  showTotalPages: _react2.default.PropTypes.bool,
  // FUNCTIONS
  onChangePage: _react2.default.PropTypes.func
};

TableFooter.defaultProps = {
  pagination: {
    enabled: true,
    pageSize: 20,
    page: 1,
    total: null
  },
  showTotalPages: false,
  // FUNCTIONS
  onChangePage: null
};