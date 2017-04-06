'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DatasetService = require('../../services/DatasetService');

var _DatasetService2 = _interopRequireDefault(_DatasetService);

var _getQueryByFilters = require('../../utils/getQueryByFilters');

var _getQueryByFilters2 = _interopRequireDefault(_getQueryByFilters);

var _DatasetFilterItem = require('./DatasetFilterItem');

var _DatasetFilterItem2 = _interopRequireDefault(_DatasetFilterItem);

var _Spinner = require('../ui/Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

var _Button = require('../ui/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatasetFilter = function (_React$Component) {
  _inherits(DatasetFilter, _React$Component);

  function DatasetFilter(props) {
    _classCallCheck(this, DatasetFilter);

    var _this = _possibleConstructorReturn(this, (DatasetFilter.__proto__ || Object.getPrototypeOf(DatasetFilter)).call(this, props));

    _this.state = {
      loading: true,
      columns: [],
      filters: [{}], // We need to create an empty object to render the first one
      query: (0, _getQueryByFilters2.default)(props.dataset.tableName)
    };

    // DatasetService
    _this.datasetService = new _DatasetService2.default(props.dataset.id, {
      apiURL: 'https://api.resourcewatch.org/v1'
    });

    // BINDINGS
    _this.triggerChangeFilters = _this.triggerChangeFilters.bind(_this);
    _this.triggerNewFilter = _this.triggerNewFilter.bind(_this);
    _this.triggerDeleteFilters = _this.triggerDeleteFilters.bind(_this);
    _this.triggerFetchFilteredData = _this.triggerFetchFilteredData.bind(_this);
    return _this;
  }

  _createClass(DatasetFilter, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      this.datasetService.getFilters().then(function (data) {
        _this2.setState({
          loading: false,
          columns: data
        }, function () {
          if (_this2.props.onChange) {
            _this2.props.onChange({
              query: _this2.state.query,
              columns: _this2.state.columns
            });
          }
        });
      }).catch(function (err) {
        console.error(err);
        _this2.setState({ loading: false });
      });
    }

    /**
     * UI EVENTS
     * - triggerChangeFilters
     * - triggerNewFilter
     * - triggerDeleteFilters
     * - triggerFetchFilteredData
    */

  }, {
    key: 'triggerChangeFilters',
    value: function triggerChangeFilters(obj, i) {
      var _this3 = this;

      var filters = [].concat(this.state.filters);
      filters[i] = obj;
      var query = (0, _getQueryByFilters2.default)(this.props.dataset.tableName, filters);

      this.setState({ filters: filters, query: query }, function () {
        if (_this3.props.onChange) {
          _this3.props.onChange({
            query: _this3.state.query,
            filters: _this3.state.filters
          });
        }
      });
    }
  }, {
    key: 'triggerNewFilter',
    value: function triggerNewFilter() {
      var _this4 = this;

      var filters = [].concat(this.state.filters);
      filters.push({});
      var query = (0, _getQueryByFilters2.default)(this.props.dataset.tableName, filters);

      this.setState({ filters: filters, query: query }, function () {
        if (_this4.props.onChange) {
          _this4.props.onChange({
            query: _this4.state.query,
            filters: _this4.state.filters
          });
        }
      });
    }
  }, {
    key: 'triggerDeleteFilters',
    value: function triggerDeleteFilters(index) {
      var _this5 = this;

      var filters = [].concat(this.state.filters);
      filters.splice(index, 1);
      var query = (0, _getQueryByFilters2.default)(this.props.dataset.tableName, filters);

      this.setState({ filters: filters, query: query }, function () {
        if (_this5.props.onChange) {
          _this5.props.onChange({
            query: _this5.state.query,
            filters: _this5.state.filters
          });
        }
      });
    }
  }, {
    key: 'triggerFetchFilteredData',
    value: function triggerFetchFilteredData() {
      this.datasetService.fetchFilteredData(this.state.query).then(function (data) {
        console.info(data);
      }).catch(function (err) {
        console.error(err);
      });
    }

    /**
     * HELPERS
     * - getColumns
    */

  }, {
    key: 'getColumns',
    value: function getColumns(index) {
      var _state = this.state,
          columns = _state.columns,
          filters = _state.filters;

      var parsedFilters = [].concat(filters);
      var parsedColumns = [].concat(columns);

      if (filters.length > 1 && index) {
        parsedFilters = parsedFilters.slice(null, index).map(function (filter) {
          return filter.filters.columnName;
        });
        parsedColumns = parsedColumns.filter(function (column) {
          var isColumnFiltered = parsedFilters.indexOf(column.columnName) === -1;
          return isColumnFiltered;
        });
      }

      return parsedColumns;
    }

    /**
     * RENDER
    */

  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var _state2 = this.state,
          columns = _state2.columns,
          filters = _state2.filters,
          query = _state2.query,
          loading = _state2.loading;


      return _react2.default.createElement(
        'div',
        { className: 'c-datasets-filter' },
        loading && _react2.default.createElement(_Spinner2.default, { isLoading: loading, className: '-light' }),
        _react2.default.createElement(
          'div',
          { className: 'list' },
          !!columns.length && filters.map(function (filter, i) {
            return _react2.default.createElement(_DatasetFilterItem2.default, {
              key: i,
              index: i,
              columns: _this6.getColumns(i),
              filters: filter.filters,
              selected: filter.selected,
              onChange: function onChange(value) {
                return _this6.triggerChangeFilters(value, i);
              },
              onDelete: function onDelete() {
                return _this6.triggerDeleteFilters(i);
              }
            });
          })
        ),
        _react2.default.createElement(
          'ul',
          { className: 'c-field-buttons actions' },
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _Button2.default,
              {
                properties: {
                  type: 'button',
                  className: '-primary'
                },
                onClick: this.triggerNewFilter
              },
              'Add new'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _Button2.default,
              {
                properties: {
                  type: 'button',
                  className: '-primary'
                },
                onClick: this.triggerFetchFilteredData
              },
              'Preview'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'actions' },
          _react2.default.createElement(
            'pre',
            null,
            _react2.default.createElement(
              'code',
              { className: 'language-sql' },
              query
            )
          )
        )
      );
    }
  }]);

  return DatasetFilter;
}(_react2.default.Component);

DatasetFilter.propTypes = {
  dataset: _react2.default.PropTypes.object.isRequired,
  onChange: _react2.default.PropTypes.func
};

exports.default = DatasetFilter;