'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jiminy = require('jiminy');

var _jiminy2 = _interopRequireDefault(_jiminy);

var _constants = require('./constants');

var _queries = require('../../../utils/queries');

var _widgets = require('../../../utils/widgets');

var _Field = require('../../Form/Field');

var _Field2 = _interopRequireDefault(_Field);

var _Select = require('../../Form/Select');

var _Select2 = _interopRequireDefault(_Select);

var _Spinner = require('../../UI/Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

var _VegaChart = require('../VegaChart');

var _VegaChart2 = _interopRequireDefault(_VegaChart);

var _DatasetService = require('../../../services/DatasetService');

var _DatasetService2 = _interopRequireDefault(_DatasetService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WidgetPreview = function (_React$Component) {
  _inherits(WidgetPreview, _React$Component);

  function WidgetPreview(props) {
    _classCallCheck(this, WidgetPreview);

    var _this = _possibleConstructorReturn(this, (WidgetPreview.__proto__ || Object.getPrototypeOf(WidgetPreview)).call(this, props));

    _this.state = {
      loading: true,

      // Options
      chartOptions: [],
      xOptions: [],
      yOptions: [],

      // Config
      parsedConfig: {},

      // Selected
      selected: {
        type: '',
        xAxis: '',
        yAxis: '',
        chartConfig: {}
      }
    };

    // DatasetService
    _this.datasetService = new _DatasetService2.default(props.wizard.dataset.id, {
      apiURL: 'https://api.resourcewatch.org'
    });

    // BINDINGS
    _this.triggerChangeSelected = _this.triggerChangeSelected.bind(_this);
    return _this;
  }

  _createClass(WidgetPreview, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      this.datasetService.fetchFilteredData(this.props.wizard.query).then(function (data) {
        _this2.setState({
          loading: false,
          data: data
        }, function () {
          _this2.getChartOptions();
        });
      }).catch(function (err) {
        console.error(err);
        _this2.setState({ loading: false });
      });
    }

    /**
     * HELPERS
     * - getChartOptions
     * - getChartData
     * - getAxisOptions
    */

  }, {
    key: 'getChartOptions',
    value: function getChartOptions() {
      /* Finally, you instantiate Jiminy with both the objects */
      this.jiminy = new _jiminy2.default(this.state.data, _constants.chartConfig);

      /* You can get recommendations: what chartOptions you can build with the data: */
      this.setState({
        chartOptions: this.jiminy.recommendation(this.state.selected.columns)
      });
    }
  }, {
    key: 'getChartData',
    value: function getChartData() {
      var selected = this.state.selected;
      var wizard = this.props.wizard;

      var columns = [];

      if (selected.xAxis) columns.push({ key: 'x', value: selected.xAxis });
      if (selected.yAxis) columns.push({ key: 'y', value: selected.yAxis });

      var sql = (0, _queries.getQueryByFilters)(wizard.dataset.tableName, wizard.filters, columns);

      var parsedConfig = {
        data: [{
          url: 'https://api.resourcewatch.org/query/' + wizard.dataset.id + '?sql=' + sql,
          name: 'table',
          format: {
            type: 'json',
            property: 'data'
          }
        }]
      };

      this.setState({ parsedConfig: parsedConfig });
    }
  }, {
    key: 'getAxisOptions',
    value: function getAxisOptions() {
      var _this3 = this;

      var selected = this.state.selected;

      this.setState({
        xOptions: selected.type ? this.jiminy.columns(selected.type, selected.yAxis) : [],
        yOptions: selected.type ? this.jiminy.columns(selected.type, selected.xAxis) : []
      }, function () {
        _this3.getChartData();
      });
    }

    /**
     * UI EVENTS
     * - triggerChangeSelected
    */

  }, {
    key: 'triggerChangeSelected',
    value: function triggerChangeSelected(obj) {
      var _this4 = this;

      // If type doesn't exist let's clear the selects
      var objParsed = Object.prototype.hasOwnProperty.call(obj, 'type') ? Object.assign({}, obj, { xAxis: null, yAxis: null }) : obj;
      var selected = Object.assign({}, this.state.selected, objParsed);
      this.setState({ selected: selected }, function () {
        _this4.getAxisOptions();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _state = this.state,
          selected = _state.selected,
          loading = _state.loading,
          chartOptions = _state.chartOptions,
          xOptions = _state.xOptions,
          yOptions = _state.yOptions,
          parsedConfig = _state.parsedConfig;

      return _react2.default.createElement(
        'div',
        { className: 'c-widgets-preview' },
        _react2.default.createElement(_Spinner2.default, { className: '-light', isLoading: loading }),
        _react2.default.createElement(
          'fieldset',
          { className: 'c-field-container' },
          !!chartOptions.length && _react2.default.createElement(
            _Field2.default,
            {
              options: chartOptions.map(function (graphType) {
                return { label: graphType, value: graphType };
              }),
              properties: {
                name: 'type',
                label: 'Chart type',
                default: '',
                value: selected.type
              },
              onChange: function onChange(value) {
                return _this5.triggerChangeSelected({ type: value });
              }
            },
            _Select2.default
          ),
          !!xOptions.length && _react2.default.createElement(
            _Field2.default,
            {
              options: xOptions.map(function (xOption) {
                return { label: xOption, value: xOption };
              }),
              properties: {
                name: 'xAxis',
                label: 'X axis',
                default: '',
                value: selected.xAxis
              },
              onChange: function onChange(value) {
                return _this5.triggerChangeSelected({ xAxis: value });
              }
            },
            _Select2.default
          ),
          !!yOptions.length && _react2.default.createElement(
            _Field2.default,
            {
              options: yOptions.map(function (yOption) {
                return { label: yOption, value: yOption };
              }),
              properties: {
                name: 'yAxis',
                label: 'Y axis',
                default: '',
                value: selected.yAxis
              },
              onChange: function onChange(value) {
                return _this5.triggerChangeSelected({ yAxis: value });
              }
            },
            _Select2.default
          ),
          _react2.default.createElement(_VegaChart2.default, {
            data: (0, _widgets.getParsedConfig)(selected.type, parsedConfig)
          })
        )
      );
    }
  }]);

  return WidgetPreview;
}(_react2.default.Component);

WidgetPreview.propTypes = {
  wizard: _react2.default.PropTypes.object.isRequired
};

exports.default = WidgetPreview;