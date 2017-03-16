'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sortBy = require('lodash/sortBy');

var _sortBy2 = _interopRequireDefault(_sortBy);

var _Spinner = require('../../UI/Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatasetList = function (_React$Component) {
  _inherits(DatasetList, _React$Component);

  function DatasetList(props) {
    _classCallCheck(this, DatasetList);

    var _this = _possibleConstructorReturn(this, (DatasetList.__proto__ || Object.getPrototypeOf(DatasetList)).call(this, props));

    _this.state = {
      datasets: [],
      loading: true
    };
    return _this;
  }

  _createClass(DatasetList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getDatasets();
    }

    /**
     * HELPERS
     * - getDatasets
    */

  }, {
    key: 'getDatasets',
    value: function getDatasets() {
      var _this2 = this;

      var application = this.props.application;

      var url = 'https://api.resourcewatch.org/dataset?app=' + application.join(',') + '&includes=widget,layer&page[size]=' + Date.now() / 100000;

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
      var mode = this.props.mode;

      var datasets = _react2.default.createElement(
        'ul',
        { className: 'list' },
        this.state.datasets.map(function (dataset) {
          return _react2.default.createElement(
            'li',
            { key: dataset.id, className: 'list-item' },
            dataset.name
          );
        })
      );

      return _react2.default.createElement(
        'div',
        { className: 'c-datasets-list -' + mode },
        _react2.default.createElement(_Spinner2.default, { className: '-light', isLoading: this.state.loading }),
        datasets
      );
    }
  }]);

  return DatasetList;
}(_react2.default.Component);

DatasetList.defaultProps = {
  application: ['rw'],
  selectable: true,
  editable: true,
  editPath: '/datasets/:id/edit'
};

DatasetList.propTypes = {
  application: _react2.default.PropTypes.array.isRequired,
  selectable: _react2.default.PropTypes.bool,
  editable: _react2.default.PropTypes.bool,
  editPath: _react2.default.PropTypes.string,
  selected: _react2.default.PropTypes.object, // deprecated
  onChange: _react2.default.PropTypes.func // deprecated
};

exports.default = DatasetList;