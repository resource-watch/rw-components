'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getQueryByFilters = require('../../../utils/getQueryByFilters');

var _getQueryByFilters2 = _interopRequireDefault(_getQueryByFilters);

var _getWidgetConfig = require('../../../utils/getWidgetConfig');

var _getWidgetConfig2 = _interopRequireDefault(_getWidgetConfig);

var _Field = require('../../form/Field');

var _Field2 = _interopRequireDefault(_Field);

var _SelectInput = require('../../form/SelectInput');

var _SelectInput2 = _interopRequireDefault(_SelectInput);

var _Spinner = require('../../ui/Spinner');

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

  _createClass(WidgetPreview, null, [{
    key: 'getAllowedColumns',
    value: function getAllowedColumns(columns) {
      var allowedColumns = ['bar', 'scatter', 'line'];

      return columns.map(function (graphType) {
        return { label: graphType, value: graphType, disabled: !allowedColumns.includes(graphType) };
      });
    }
  }]);

  function WidgetPreview(props) {
    _classCallCheck(this, WidgetPreview);

    var _this = _possibleConstructorReturn(this, (WidgetPreview.__proto__ || Object.getPrototypeOf(WidgetPreview)).call(this, props));

    _this.state = {
      loading: true,

      // Jiminy
      jiminy: {},
      xOptions: [],
      yOptions: [],

      // Config
      widgetConfig: {},

      // Selected
      selected: {
        type: '',
        xAxis: '',
        yAxis: ''
      }
    };

    // DatasetService
    _this.datasetService = new _DatasetService2.default(props.dataset.id, {
      apiURL: 'https://api.resourcewatch.org/v1'
    });

    // BINDINGS
    _this.triggerChangeSelected = _this.triggerChangeSelected.bind(_this);
    return _this;
  }

  _createClass(WidgetPreview, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      this.datasetService.fetchJiminy(this.props.wizard.query).then(function (jiminy) {
        _this2.setState({
          loading: false,
          jiminy: jiminy
        });
      }).catch(function (err) {
        console.error(err);
        _this2.setState({ loading: false });
      });
    }

    /**
     * HELPERS
     * - getChartData
     * - getAxisOptions
    */

  }, {
    key: 'getChartData',
    value: function getChartData() {
      var _this3 = this;

      var selected = this.state.selected;
      var _props = this.props,
          wizard = _props.wizard,
          dataset = _props.dataset;

      var columns = [];

      if (selected.xAxis) columns.push({ key: 'x', value: selected.xAxis, as: true });
      if (selected.yAxis) columns.push({ key: 'y', value: selected.yAxis, as: true });

      var sql = (0, _getQueryByFilters2.default)(dataset.tableName, wizard.filters, columns, [{ name: 'x', type: 'ASC' }]);

      var dataWidgetConfig = {
        data: [{
          url: 'https://api.resourcewatch.org/v1/query/' + dataset.id + '?sql=' + sql,
          name: 'table',
          format: {
            type: 'json',
            property: 'data'
          }
        }]
      };

      this.setState({
        widgetConfig: (0, _getWidgetConfig2.default)(selected.type, dataWidgetConfig)
      }, function () {
        _this3.props.onChange({
          widgetConfig: _this3.state.widgetConfig
        });
      });
    }
  }, {
    key: 'getAxisOptions',
    value: function getAxisOptions() {
      var _this4 = this;

      var _state = this.state,
          selected = _state.selected,
          jiminy = _state.jiminy;


      var xOptions = [];
      var yOptions = [];

      if (selected.type) {
        xOptions = selected.yAxis ? jiminy.byType[selected.type].columns[selected.yAxis] : jiminy.byType[selected.type].general;
        yOptions = selected.xAxis ? jiminy.byType[selected.type].columns[selected.xAxis] : jiminy.byType[selected.type].general;
      }

      this.setState({
        xOptions: xOptions,
        yOptions: yOptions
      }, function () {
        _this4.getChartData();
      });
    }

    /**
     * UI EVENTS
     * - triggerChangeSelected
    */

  }, {
    key: 'triggerChangeSelected',
    value: function triggerChangeSelected(obj) {
      var _this5 = this;

      // If type doesn't exist let's clear the selects
      var objParsed = Object.prototype.hasOwnProperty.call(obj, 'type') ? Object.assign({}, obj, { xAxis: null, yAxis: null }) : obj;
      var selected = Object.assign({}, this.state.selected, objParsed);
      this.setState({ selected: selected }, function () {
        _this5.getAxisOptions();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var _state2 = this.state,
          selected = _state2.selected,
          loading = _state2.loading,
          jiminy = _state2.jiminy,
          xOptions = _state2.xOptions,
          yOptions = _state2.yOptions,
          widgetConfig = _state2.widgetConfig;

      return _react2.default.createElement(
        'div',
        { className: 'c-widgets-preview' },
        _react2.default.createElement(_Spinner2.default, { className: '-light', isLoading: loading }),
        _react2.default.createElement(
          'fieldset',
          { className: 'c-field-container' },
          !!jiminy.general && !!jiminy.general.length && _react2.default.createElement(
            _Field2.default,
            {
              options: WidgetPreview.getAllowedColumns(jiminy.general),
              properties: {
                name: 'type',
                label: 'Chart type',
                default: '',
                value: selected.type
              },
              onChange: function onChange(value) {
                return _this6.triggerChangeSelected({ type: value });
              }
            },
            _SelectInput2.default
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
                return _this6.triggerChangeSelected({ xAxis: value });
              }
            },
            _SelectInput2.default
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
                return _this6.triggerChangeSelected({ yAxis: value });
              }
            },
            _SelectInput2.default
          ),
          selected.type && _react2.default.createElement(_VegaChart2.default, {
            data: widgetConfig,
            toggleLoading: function toggleLoading(bool) {
              return console.info(bool);
            }
          })
        )
      );
    }
  }]);

  return WidgetPreview;
}(_react2.default.Component);

WidgetPreview.propTypes = {
  wizard: _react2.default.PropTypes.object.isRequired,
  dataset: _react2.default.PropTypes.object.isRequired,
  onChange: _react2.default.PropTypes.func.isRequired
};

exports.default = WidgetPreview;