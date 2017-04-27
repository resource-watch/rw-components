'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CustomTable = require('../../ui/customtable/CustomTable');

var _CustomTable2 = _interopRequireDefault(_CustomTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VocabulariesTable = function (_React$Component) {
  _inherits(VocabulariesTable, _React$Component);

  function VocabulariesTable() {
    _classCallCheck(this, VocabulariesTable);

    return _possibleConstructorReturn(this, (VocabulariesTable.__proto__ || Object.getPrototypeOf(VocabulariesTable)).apply(this, arguments));
  }

  _createClass(VocabulariesTable, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'c-vocabularies-table' },
        _react2.default.createElement(_CustomTable2.default, {
          columns: [{ label: 'name', value: 'name' }],
          actions: { show: false, list: [] },
          data: this.props.vocabularies,
          pageSize: 20,
          pagination: {
            enabled: true,
            pageSize: 20,
            page: 0
          },
          onToggleSelectedRow: function onToggleSelectedRow(ids) {
            console.info(ids);
          },
          onRowDelete: function onRowDelete(id) {
            console.info(id);
          }
        })
      );
    }
  }]);

  return VocabulariesTable;
}(_react2.default.Component);

VocabulariesTable.defaultProps = {
  application: ['rw'],
  columns: [],
  actions: {}
};

VocabulariesTable.propTypes = {
  application: _react2.default.PropTypes.array.isRequired,
  authorization: _react2.default.PropTypes.string,
  vocabularies: _react2.default.PropTypes.array
};

exports.default = VocabulariesTable;