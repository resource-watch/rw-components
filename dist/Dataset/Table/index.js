'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Select = require('../../Form/Select');

var _Select2 = _interopRequireDefault(_Select);

require('./style.scss');

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
      message: 'Loading...',
      default: []
    };
    return _this;
  }

  _createClass(DatasetTable, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          application = _props.application,
          path = _props.path;

      this.getDatasets(path, application);

      // Bindings
      this.sortDatasets = this.sortDatasets.bind(this);
    }
  }, {
    key: 'getDatasets',
    value: function getDatasets(path, apps) {
      var _this2 = this;

      var appsStr = apps.join(',');
      var url = 'https://api.resourcewatch.org/' + path + '?app=' + appsStr + '&includes=widget,layer&page[size]=' + Date.now() / 100000;

      fetch(new Request(url)).then(function (response) {
        if (response.ok) return response.json();
        _this2.setState({ message: 'Error loading datasets' });
        throw new Error(response.statusText);
      }).then(function (response) {
        var message = !response.data.length ? 'No datasets' : '';
        var datasets = _this2.parseData(response.data);
        _this2.setState({ message: message, datasets: datasets, default: datasets.slice() });
      }).catch(function () {
        _this2.setState({ message: 'Error loading datasets' });
      });
    }

    /**
     * UI EVENTS
     * - sortDatasets
    */

  }, {
    key: 'sortDatasets',
    value: function sortDatasets(value) {
      // Sort datasets
      var datasets = this.sortBy(value);
      // Set datasets
      this.setState({ datasets: datasets });
    }

    /**
     * HELPERS
     * - parseData
     * - sortBy
    */

  }, {
    key: 'parseData',
    value: function parseData(data) {
      return data.map(function (dataset) {
        var attr = dataset.attributes;

        return {
          name: dataset.attributes.name,
          id: dataset.id,
          apps: attr.application.join(', '),
          widget: attr.widget && Object.keys(attr.widget).length > 0,
          layer: attr.layer && Object.keys(attr.layer).length > 0
        };
      });
    }
  }, {
    key: 'sortBy',
    value: function sortBy(type) {
      if (!type) {
        return this.state.default.slice();
      }

      var sortedDatasets = this.state.datasets.sort(function (a, b) {
        var x = a.name.toLowerCase();
        var y = b.name.toLowerCase();

        return x < y ? -1 : x > y ? 1 : 0;
      });

      return type === 'desc' ? sortedDatasets.reverse() : sortedDatasets;
    }
  }, {
    key: 'render',
    value: function render() {
      var path = this.props.path;


      return _react2.default.createElement(
        'div',
        { className: 'c-datasets-list' },
        _react2.default.createElement(
          'div',
          { className: 'intro' },
          _react2.default.createElement(
            'h4',
            { className: 'count' },
            this.state.datasets.length,
            ' datasets'
          ),
          _react2.default.createElement(
            'div',
            { className: 'sort' },
            'Sort by',
            _react2.default.createElement(_Select2.default
            // onChange={value => this.props.onChange({ name: value })}
            , { onChange: this.sortDatasets,
              options: [{ label: 'Default', value: '' }, { label: 'A - Z', value: 'asc' }, { label: 'Z - A', value: 'desc' }],
              properties: {
                default: ''
              }
            })
          )
        ),
        this.state.datasets.length ? _react2.default.createElement(
          'table',
          { className: 'list' },
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                null,
                'Name'
              ),
              _react2.default.createElement(
                'th',
                null,
                'Applications'
              ),
              _react2.default.createElement(
                'th',
                null,
                'Has Layer'
              ),
              _react2.default.createElement(
                'th',
                null,
                'Has Widget'
              ),
              _react2.default.createElement('th', null)
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            this.state.datasets.map(function (dataset) {
              return _react2.default.createElement(
                'tr',
                { key: dataset.id, className: 'item' },
                _react2.default.createElement(
                  'td',
                  null,
                  dataset.name ? dataset.name : dataset.msg
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  dataset.apps
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  dataset.layer ? 'true' : 'false'
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  dataset.widget ? 'true' : 'false'
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  dataset.id && _react2.default.createElement(
                    'a',
                    { href: path + '?id=' + dataset.id, className: 'btn-edit' },
                    'Edit'
                  )
                )
              );
            })
          )
        ) : _react2.default.createElement(
          'p',
          null,
          this.state.message
        )
      );
    }
  }]);

  return DatasetTable;
}(_react2.default.Component);

DatasetTable.propTypes = {
  application: _react2.default.PropTypes.array.isRequired,
  path: _react2.default.PropTypes.string.isRequired
};

exports.default = DatasetTable;