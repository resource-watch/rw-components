'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sortBy = require('lodash/sortBy');

var _sortBy2 = _interopRequireDefault(_sortBy);

var _Spinner = require('../../ui/Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

var _CustomTable = require('../../ui/customtable/CustomTable');

var _CustomTable2 = _interopRequireDefault(_CustomTable);

var _DeleteAction = require('./actions/DeleteAction');

var _DeleteAction2 = _interopRequireDefault(_DeleteAction);

var _MetadataAction = require('./actions/MetadataAction');

var _MetadataAction2 = _interopRequireDefault(_MetadataAction);

var _StatusTD = require('./td/StatusTD');

var _StatusTD2 = _interopRequireDefault(_StatusTD);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatasetTable = function (_React$Component) {
  _inherits(DatasetTable, _React$Component);

  function DatasetTable(props) {
    _classCallCheck(this, DatasetTable);

    var _this = _possibleConstructorReturn(this, (DatasetTable.__proto__ || Object.getPrototypeOf(DatasetTable)).call(this, props));

    _this.state = {
      datasets: [],
      loading: true
    };
    return _this;
  }

  _createClass(DatasetTable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getDatasets();
    }

    /**
     * HELPERS
     * - getDatasets
     * - validate
     * - isValid
    */

  }, {
    key: 'getDatasets',
    value: function getDatasets() {
      var _this2 = this;

      var application = this.props.application;

      var url = 'https://api.resourcewatch.org/v1/dataset?application=' + application.join(',') + '&includes=widget,layer,metadata&page[size]=' + Date.now() / 100000;

      fetch(new Request(url)).then(function (response) {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      }).then(function (response) {
        var datasets = (0, _sortBy2.default)(response.data.map(function (dataset) {
          return Object.assign({}, dataset.attributes, {
            id: dataset.id
          });
        }), 'name');
        _this2.setState({ datasets: datasets, loading: false });
      }).catch(function () {
        _this2.setState({ message: 'Error loading datasets', loading: false });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'c-dataset-table' },
        _react2.default.createElement(_Spinner2.default, { className: '-light', isLoading: this.state.loading }),
        _react2.default.createElement(_CustomTable2.default, {
          columns: [{ label: 'name', value: 'name' }, { label: 'status', value: 'status', td: _StatusTD2.default }, { label: 'provider', value: 'provider' }],
          actions: {
            show: true,
            list: [{ name: 'Edit', path: 'datasets/:id/edit', show: true }, { name: 'Remove', path: 'datasets/:id/remove', component: _DeleteAction2.default, componentProps: { authorization: this.props.authorization } }, { name: 'Metadata', path: 'datasets/:id/metadata', component: _MetadataAction2.default }]
          },
          data: this.state.datasets,
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

  return DatasetTable;
}(_react2.default.Component);

DatasetTable.defaultProps = {
  application: ['rw'],
  columns: [{ label: 'name', value: 'name' }, { label: 'provider', value: 'provider' }],
  actions: {
    show: true,
    list: [{ name: 'Edit', path: 'datasets/:id/edit', show: true }, { name: 'Remove', path: 'datasets/:id/remove', show: true }]
  }
};

DatasetTable.propTypes = {
  application: _react2.default.PropTypes.array.isRequired,
  authorization: _react2.default.PropTypes.string
};

exports.default = DatasetTable;