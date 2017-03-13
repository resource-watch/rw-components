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

var _Card = require('../Card');

var _Card2 = _interopRequireDefault(_Card);

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
      loading: true,
      selected: props.selected || {},
      valid: false
    };

    // BINDINGS
    _this.triggerClick = _this.triggerClick.bind(_this);
    return _this;
  }

  _createClass(DatasetList, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
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
    key: 'validate',
    value: function validate() {
      var valid = !!this.state.selected;
      this.setState({ valid: valid });
    }
  }, {
    key: 'isValid',
    value: function isValid() {
      return this.state.valid;
    }

    /**
     * UI EVENTS
     * - triggerClick
    */

  }, {
    key: 'triggerClick',
    value: function triggerClick(selected) {
      var _this3 = this;

      this.setState({ selected: selected }, function () {
        if (_this3.props.onChange) _this3.props.onChange(_this3.state.selected);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var selected = this.state.selected;

      return _react2.default.createElement(
        'div',
        { className: 'c-datasets-list' },
        this.state.loading && _react2.default.createElement(_Spinner2.default, { className: '-light', isLoading: this.state.loading }),
        !!this.state.datasets.length && _react2.default.createElement(
          'ul',
          { className: 'list' },
          this.state.datasets.map(function (dataset) {
            return _react2.default.createElement(
              'li',
              {
                key: dataset.id,
                className: 'list-item'
              },
              _react2.default.createElement(_Card2.default, {
                dataset: dataset,
                properties: {
                  'data-id': dataset.id,
                  className: dataset.id === selected.id ? '-selected' : ''
                },
                onClick: _this4.triggerClick
              })
            );
          })
        )
      );
    }
  }]);

  return DatasetList;
}(_react2.default.Component);

DatasetList.propTypes = {
  application: _react2.default.PropTypes.array.isRequired,
  selected: _react2.default.PropTypes.object,
  onChange: _react2.default.PropTypes.func
};

exports.default = DatasetList;