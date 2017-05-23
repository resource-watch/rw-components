'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _vega = require('vega');

var _vega2 = _interopRequireDefault(_vega);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _vegaTheme = require('../../utils/widgets/vega-theme');

var _vegaTheme2 = _interopRequireDefault(_vegaTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VegaChart = function (_React$Component) {
  _inherits(VegaChart, _React$Component);

  function VegaChart(props) {
    _classCallCheck(this, VegaChart);

    // BINDINGS
    var _this = _possibleConstructorReturn(this, (VegaChart.__proto__ || Object.getPrototypeOf(VegaChart)).call(this, props));

    _this.triggerResize = (0, _debounce2.default)(_this.triggerResize.bind(_this), 250);
    return _this;
  }

  _createClass(VegaChart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.mounted = true;
      this.renderChart();
      window.addEventListener('resize', this.triggerResize);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return !(0, _isEqual2.default)(nextProps.data, this.props.data);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      // We should check if the data has changed
      this.renderChart();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.triggerResize);
      this.mounted = false;
    }
  }, {
    key: 'setSize',
    value: function setSize() {
      if (this.chart) {
        this.width = this.chart.offsetWidth;
        this.height = this.chart.offsetHeight;
      }
    }
  }, {
    key: 'parseVega',
    value: function parseVega() {
      var _this2 = this;

      var size = {
        width: this.width
        // height: this.height
      };

      var data = Object.assign({}, this.props.data, size);

      if (this.mounted && this.props.toggleLoading) this.props.toggleLoading(true);
      _vega2.default.parse.spec(data, _vegaTheme2.default, function (err, chart) {
        if (_this2.mounted && _this2.props.toggleLoading) _this2.props.toggleLoading(false);
        if (!err && _this2.mounted) {
          _this2.vis = chart({
            el: _this2.chart,
            renderer: 'svg'
          });
          _this2.vis.update();
        }
      });
    }
  }, {
    key: 'triggerResize',
    value: function triggerResize() {
      this.renderChart();
    }
  }, {
    key: 'renderChart',
    value: function renderChart() {
      this.setSize();
      this.parseVega();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        { className: 'c-chart' },
        _react2.default.createElement('div', { ref: function ref(c) {
            _this3.chart = c;
          }, className: 'chart' })
      );
    }
  }]);

  return VegaChart;
}(_react2.default.Component);

VegaChart.propTypes = {
  // Define the chart data
  data: _react2.default.PropTypes.object,
  toggleLoading: _react2.default.PropTypes.func
};

exports.default = VegaChart;