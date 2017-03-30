'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTether = require('react-tether');

var _reactTether2 = _interopRequireDefault(_reactTether);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _Icon = require('../../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _CheckboxGroup = require('../../../Form/CheckboxGroup');

var _CheckboxGroup2 = _interopRequireDefault(_CheckboxGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableFilters = function (_React$Component) {
  _inherits(TableFilters, _React$Component);

  function TableFilters(props) {
    _classCallCheck(this, TableFilters);

    var _this = _possibleConstructorReturn(this, (TableFilters.__proto__ || Object.getPrototypeOf(TableFilters)).call(this, props));

    _this.state = {
      closed: true,
      input: '',
      sort: 1,
      values: props.values || [],
      selected: props.selected || []
    };

    // Bindings
    _this.onToggle = _this.onToggle.bind(_this);
    _this.onScreenClick = _this.onScreenClick.bind(_this);

    _this.onChangeInput = _this.onChangeInput.bind(_this);
    _this.onResetInput = _this.onResetInput.bind(_this);

    _this.onFilterSelect = _this.onFilterSelect.bind(_this);
    _this.onFilterSelectAll = _this.onFilterSelectAll.bind(_this);
    _this.onFilterClear = _this.onFilterClear.bind(_this);
    return _this;
  }

  /* Component lifecycle */


  _createClass(TableFilters, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var selected = nextProps.selected ? nextProps.selected : nextProps.values;
      this.setState({
        selected: nextProps.selected ? nextProps.selected : nextProps.values,
        values: nextProps.values
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('click', this.onScreenClick);
    }

    /**
     * UI EVENTS
     * - onToggle
     * - onScreenClick
     *
     * - onChangeInput
     * - onResetInput
     *
     * - onFilterSelect
     * - onFilterSelectAll
     * - onFilterClear
    */

  }, {
    key: 'onToggle',
    value: function onToggle() {
      var _this2 = this;

      var closed = this.state.closed;

      // requestAnimationFrame
      //   - Goal: Prevent double trigger at first atempt
      //   - Issue: When you add the listener the click event is not finished yet so it will trigger onScrennClick
      //   - Stop propagation?: if I put e.stopPropagation clicking on another filter btn won't trigger the screenClick,
      //                        so we will have 2 dropdown filters at the same time

      requestAnimationFrame(function () {
        return window[closed ? 'addEventListener' : 'removeEventListener']('click', _this2.onScreenClick);
      });

      this.setState({ closed: !closed, input: '' });
    }
  }, {
    key: 'onScreenClick',
    value: function onScreenClick(e) {
      var el = document.querySelector('.c-table-tooltip');
      var clickOutside = el && el.contains && !el.contains(e.target);

      if (clickOutside) {
        this.onToggle();
      }
    }
  }, {
    key: 'onChangeInput',
    value: function onChangeInput() {
      this.setState({
        input: this.input.value
      });
    }
  }, {
    key: 'onResetInput',
    value: function onResetInput(e) {
      // As we are using svg symbols, if you click on one it will consider that it's outside the dropdown
      // That's why I put this
      e && e.stopPropagation();

      this.setState({
        input: ''
      });
    }
  }, {
    key: 'onFilterSelect',
    value: function onFilterSelect(selected) {
      var _this3 = this;

      this.setState({ selected: selected }, function () {
        var _state = _this3.state,
            selected = _state.selected,
            values = _state.values;

        _this3.props.onFilter && _this3.props.onFilter({
          field: _this3.props.field,
          value: selected.length !== values.length ? selected : null
        });
      });
    }
  }, {
    key: 'onFilterSelectAll',
    value: function onFilterSelectAll() {
      var _this4 = this;

      this.setState({ selected: null }, function () {
        _this4.props.onFilter && _this4.props.onFilter({
          field: _this4.props.field,
          value: _this4.state.selected
        });
      });
    }
  }, {
    key: 'onFilterClear',
    value: function onFilterClear() {
      var _this5 = this;

      this.setState({ selected: [] }, function () {
        _this5.props.onFilter && _this5.props.onFilter({
          field: _this5.props.field,
          value: _this5.state.selected
        });
      });
    }

    /**
     * HELPERS
     * - getFilteredValues
    */

  }, {
    key: 'getFilteredValues',
    value: function getFilteredValues() {
      var _state2 = this.state,
          values = _state2.values,
          input = _state2.input;


      var filteredValues = values.filter(function (val) {
        if (input) {
          return val.toString().toLowerCase() === input.toString().toLowerCase();
        }
        return true;
      });
      return filteredValues.map(function (v) {
        return { label: v, value: v };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var field = this.props.field;
      var _state3 = this.state,
          selected = _state3.selected,
          input = _state3.input,
          values = _state3.values;


      var btnClass = (0, _classnames2.default)({
        '-active': values && selected && values.length !== selected.length
      });

      return _react2.default.createElement(
        'div',
        { className: btnClass },
        _react2.default.createElement(
          _reactTether2.default,
          {
            attachment: 'top center',
            constraints: [{
              to: 'window'
            }],
            classes: {
              element: 'c-table-tooltip -footer'
            }
          },
          _react2.default.createElement(
            'button',
            {
              ref: function ref(node) {
                return _this6.btnToggle = node;
              },
              onClick: this.onToggle,
              className: 'table-header-btn ' + btnClass
            },
            _react2.default.createElement(_Icon2.default, { name: 'icon-filter', className: '-smaller' })
          ),
          !this.state.closed && _react2.default.createElement(
            'div',
            { className: 'tooltip-content' },
            _react2.default.createElement(
              'div',
              { className: 'content' },
              _react2.default.createElement(
                'div',
                { className: 'search-box' },
                _react2.default.createElement('input', {
                  ref: function ref(node) {
                    return _this6.input = node;
                  },
                  type: 'text',
                  value: input,
                  placeholder: 'Type search',
                  onChange: this.onChangeInput
                }),
                !input && _react2.default.createElement(
                  'button',
                  { className: '-search' },
                  _react2.default.createElement(_Icon2.default, { name: 'icon-search', className: '-small' })
                ),
                !!input && _react2.default.createElement(
                  'button',
                  {
                    className: '-close',
                    onClick: this.onResetInput
                  },
                  _react2.default.createElement(_Icon2.default, { name: 'icon-cross', className: '-small' })
                )
              ),
              _react2.default.createElement(_CheckboxGroup2.default, {
                name: field,
                selected: selected || values,
                className: field + '-checkbox-group',
                options: this.getFilteredValues(),
                onChange: this.onFilterSelect
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'footer' },
              _react2.default.createElement(
                'ul',
                null,
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'button',
                    { onClick: this.onFilterSelectAll },
                    'Select all'
                  )
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'button',
                    { onClick: this.onFilterClear },
                    'Clear'
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return TableFilters;
}(_react2.default.Component);

exports.default = TableFilters;


TableFilters.propTypes = {
  field: _react2.default.PropTypes.string.isRequired,
  values: _react2.default.PropTypes.array,
  selected: _react2.default.PropTypes.array,
  onFilter: _react2.default.PropTypes.func
};

TableFilters.defaultProps = {
  onChange: null,
  selected: null
};