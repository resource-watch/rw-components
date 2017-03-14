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

var LayerChart = function (_React$Component) {
  _inherits(LayerChart, _React$Component);

  function LayerChart(props) {
    _classCallCheck(this, LayerChart);

    var _this = _possibleConstructorReturn(this, (LayerChart.__proto__ || Object.getPrototypeOf(LayerChart)).call(this, props));

    _this.state = {
      background: ''
    };
    return _this;
  }

  _createClass(LayerChart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.mounted = true;
      this.getImagePreview();
      this.getBasemapPreview();
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _isEqual2.default)(nextProps.data, this.props.data) || nextState.background !== this.state.background || nextState.basemap !== this.state.basemap;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.mounted = false;
    }
  }, {
    key: 'getSize',
    value: function getSize() {
      return {
        width: this.chart.offsetWidth,
        height: this.chart.offsetHeight
      };
    }
  }, {
    key: 'getBasemapPreview',
    value: function getBasemapPreview() {
      var _this2 = this;

      var basemap = {
        account: 'wri-01',
        body: {
          maxzoom: 18,
          minzoom: 3,
          layers: [{
            type: 'mapnik',
            options: {
              sql: 'SELECT * FROM gadm28_countries',
              cartocss: '#gadm28_countries{ polygon-fill: #bbbbbb; polygon-opacity: 1; line-color: #FFFFFF; line-width: 0.5; line-opacity: 0.5;}',
              cartocss_version: '2.3.0'
            }
          }]
        }
      };
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'https://' + basemap.account + '.carto.com/api/v1/map');
      xmlhttp.setRequestHeader('Content-Type', 'application/json');
      xmlhttp.send(JSON.stringify(basemap.body));
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
          if (xmlhttp.status === 200 && _this2.mounted) {
            var response = JSON.parse(xmlhttp.responseText);
            var dimensions = _this2.getSize();
            var options = {
              token: response.layergroupid,
              z: 1,
              lat: 0,
              lng: 0,
              width: dimensions.width,
              height: dimensions.height,
              format: 'png'
            };

            _this2.setState({
              basemap: 'https://' + basemap.account + '.carto.com/api/v1/map/static/center/' + options.token + '/' + options.z + '/' + options.lat + '/' + options.lng + '/' + options.width + '/' + options.height + '.' + options.format
            });
          } else {
            console.error('Basemap could not be loaded');
          }
        }
      };
    }
  }, {
    key: 'getImagePreview',
    value: function getImagePreview() {
      var _this3 = this;

      var data = this.props.data;


      if (this.mounted) this.props.toggleLoading(true);

      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'https://' + data.account + '.carto.com/api/v1/map');
      xmlhttp.setRequestHeader('Content-Type', 'application/json');
      xmlhttp.send(JSON.stringify(data.body));
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
          if (_this3.mounted) _this3.props.toggleLoading(false);
          if (xmlhttp.status === 200 && _this3.mounted) {
            var response = JSON.parse(xmlhttp.responseText);
            var dimensions = _this3.getSize();
            var options = {
              token: response.layergroupid,
              z: 1,
              lat: 0,
              lng: 0,
              width: dimensions.width,
              height: dimensions.height,
              format: 'png'
            };

            _this3.setState({
              background: 'https://' + data.account + '.carto.com/api/v1/map/static/center/' + options.token + '/' + options.z + '/' + options.lat + '/' + options.lng + '/' + options.width + '/' + options.height + '.' + options.format
            });
          } else {
            console.error('Image could not be loaded');
          }
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return _react2.default.createElement(
        'div',
        { className: 'c-chart' },
        _react2.default.createElement('div', {
          ref: function ref(c) {
            _this4.chart = c;
          },
          className: 'chart',
          style: { backgroundImage: 'url(\'' + this.state.background + '\') , url(\'' + this.state.basemap + '\')' }
        })
      );
    }
  }]);

  return LayerChart;
}(_react2.default.Component);

LayerChart.propTypes = {
  // Define the chart data
  data: _react2.default.PropTypes.object,
  toggleLoading: _react2.default.PropTypes.func
};

exports.default = LayerChart;