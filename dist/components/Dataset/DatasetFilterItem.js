'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _Field = require('../form/Field');

var _Field2 = _interopRequireDefault(_Field);

var _SelectInput = require('../form/SelectInput');

var _SelectInput2 = _interopRequireDefault(_SelectInput);

var _Input = require('../form/Input');

var _Input2 = _interopRequireDefault(_Input);

var _Button = require('../ui/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaults = {
  selected: {
    columnName: '',
    columnType: '',
    properties: {}
  },
  filters: {}
};

var DatasetFilterItem = function (_React$Component) {
  _inherits(DatasetFilterItem, _React$Component);

  function DatasetFilterItem(props) {
    _classCallCheck(this, DatasetFilterItem);

    var _this = _possibleConstructorReturn(this, (DatasetFilterItem.__proto__ || Object.getPrototypeOf(DatasetFilterItem)).call(this, props));

    _this.state = {
      selected: props.selected || defaults.selected,
      filters: props.filters || defaults.filters
    };

    // BINDINGS
    _this.triggerChangeSelected = _this.triggerChangeSelected.bind(_this);
    _this.triggerChangeFilters = _this.triggerChangeFilters.bind(_this);
    _this.triggerDeleteFilters = _this.triggerDeleteFilters.bind(_this);
    return _this;
  }

  _createClass(DatasetFilterItem, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        selected: nextProps.selected || defaults.selected,
        filters: nextProps.filters || defaults.filters
      });
    }

    /**
     * UI EVENTS
     * - triggerChangeSelected
     * - triggerChangeFilters
     * - triggerDeleteFilters
    */

  }, {
    key: 'triggerChangeSelected',
    value: function triggerChangeSelected(value) {
      var _this2 = this;

      var selected = (0, _find2.default)(this.props.columns, { columnName: value });

      this.setState({
        selected: selected || defaults,
        filters: selected ? this.state.filters : {}
      }, function () {
        if (_this2.props.onChange) _this2.props.onChange(_this2.state);
      });
    }
  }, {
    key: 'triggerChangeFilters',
    value: function triggerChangeFilters(obj) {
      var _this3 = this;

      var filters = Object.assign({}, this.state.filters, obj);

      this.setState({ filters: filters }, function () {
        if (_this3.props.onChange) _this3.props.onChange(_this3.state);
      });
    }
  }, {
    key: 'triggerDeleteFilters',
    value: function triggerDeleteFilters() {
      if (this.props.onDelete) this.props.onDelete();
    }

    /**
     * RENDER
    */

  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _state = this.state,
          selected = _state.selected,
          filters = _state.filters;
      var columns = this.props.columns;


      return _react2.default.createElement(
        'div',
        { className: 'c-datasets-filter-item' },
        _react2.default.createElement(
          'div',
          { className: 'column' },
          _react2.default.createElement(
            _Field2.default,
            {
              options: columns.map(function (column) {
                return {
                  label: column.columnName,
                  value: column.columnName
                };
              }),
              properties: {
                name: 'column',
                label: 'Column',
                default: filters.columnName,
                value: selected.columnName
              },
              onChange: this.triggerChangeSelected
            },
            _SelectInput2.default
          )
        ),
        (selected.columnType === 'number' || selected.columnType === 'date') && _react2.default.createElement(
          'div',
          { className: 'filters' },
          _react2.default.createElement(
            _Field2.default,
            {
              validations: [{
                type: 'min',
                condition: selected.properties.min
              }, {
                type: 'max',
                condition: filters.properties && filters.properties.max ? filters.properties.max : selected.properties.max
              }],
              properties: {
                type: selected.columnType,
                name: 'min',
                label: 'Min',
                min: selected.properties.min,
                max: selected.properties.max,
                default: filters.properties ? filters.properties.min : '',
                value: filters.properties ? filters.properties.min : ''
              },
              onChange: function onChange(value) {
                return _this4.triggerChangeFilters({
                  columnName: selected.columnName,
                  columnType: selected.columnType,
                  properties: Object.assign({}, filters.properties, {
                    min: value
                  })
                });
              }
            },
            _Input2.default
          ),
          _react2.default.createElement(
            _Field2.default,
            {
              validations: [{
                type: 'min',
                condition: filters.properties && filters.properties.min ? filters.properties.min : selected.properties.min
              }, {
                type: 'max',
                condition: selected.properties.max
              }],
              properties: {
                type: 'number',
                name: 'max',
                label: 'Max',
                min: selected.properties.min,
                max: selected.properties.max,
                default: filters.properties ? filters.properties.max : '',
                value: filters.properties ? filters.properties.max : ''
              },
              onChange: function onChange(value) {
                return _this4.triggerChangeFilters({
                  columnName: selected.columnName,
                  columnType: selected.columnType,
                  properties: Object.assign({}, filters.properties, {
                    max: value
                  })
                });
              }
            },
            _Input2.default
          )
        ),
        selected.columnType === 'string' && _react2.default.createElement(
          'div',
          { className: 'filters' },
          _react2.default.createElement(
            _Field2.default,
            {
              options: selected.properties.values.map(function (value) {
                return {
                  label: value,
                  value: value
                };
              }),
              properties: {
                name: 'values',
                label: 'Values',
                multi: true,
                default: filters.properties ? filters.properties.values : [],
                value: filters.properties ? filters.properties.values : []
              },
              onChange: function onChange(value) {
                return _this4.triggerChangeFilters({
                  columnName: selected.columnName,
                  columnType: selected.columnType,
                  properties: {
                    values: value
                  }
                });
              }
            },
            _SelectInput2.default
          )
        ),
        this.props.index !== 0 && _react2.default.createElement(
          _Button2.default,
          {
            properties: {
              type: 'button',
              className: '-primary'
            },
            onClick: this.triggerDeleteFilters
          },
          '\xD7'
        )
      );
    }
  }]);

  return DatasetFilterItem;
}(_react2.default.Component);

DatasetFilterItem.propTypes = {
  index: _react2.default.PropTypes.number.isRequired,
  selected: _react2.default.PropTypes.object,
  filters: _react2.default.PropTypes.object,
  columns: _react2.default.PropTypes.array.isRequired,
  onChange: _react2.default.PropTypes.func,
  onDelete: _react2.default.PropTypes.func
};

exports.default = DatasetFilterItem;