'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sortBy = require('lodash/sortBy');

var _sortBy2 = _interopRequireDefault(_sortBy);

var _Spinner = require('../ui/Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

var _WidgetCard = require('./WidgetCard');

var _WidgetCard2 = _interopRequireDefault(_WidgetCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WidgetList = function (_React$Component) {
  _inherits(WidgetList, _React$Component);

  function WidgetList(props) {
    _classCallCheck(this, WidgetList);

    var _this = _possibleConstructorReturn(this, (WidgetList.__proto__ || Object.getPrototypeOf(WidgetList)).call(this, props));

    _this.state = {
      widgets: [],
      loading: true,
      selected: props.selected
    };

    // BINDINGS
    _this.triggerClick = _this.triggerClick.bind(_this);
    return _this;
  }

  _createClass(WidgetList, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.getWidgets();
    }

    /**
     * HELPERS
     * - getWidgets
     * - validate
     * - isValid
    */

  }, {
    key: 'getWidgets',
    value: function getWidgets() {
      var _this2 = this;

      var _props = this.props,
          dataset = _props.dataset,
          application = _props.application;

      var url = 'https://api.resourcewatch.org/v1/dataset/' + dataset.id + '/widget?application=' + application.join(',') + '&includes=widget&page[size]=' + Date.now();

      fetch(new Request(url)).then(function (response) {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      }).then(function (response) {
        var widgets = (0, _sortBy2.default)(response.data.map(function (widget) {
          return Object.assign({}, widget.attributes, {
            id: widget.id
          });
        }), 'name');

        _this2.setState({ widgets: widgets, loading: false });
      }).catch(function () {
        _this2.setState({ message: 'Error loading datasets', loading: false });
      });
    }
  }, {
    key: 'validate',
    value: function validate() {
      var valid = true;
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
     * - triggerNewClick
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
        { className: 'c-widgets-list' },
        this.state.loading && _react2.default.createElement(_Spinner2.default, { className: '-light', isLoading: this.state.loading }),
        _react2.default.createElement(
          'ul',
          { className: 'list' },
          this.state.widgets.map(function (widget) {
            return _react2.default.createElement(
              'li',
              {
                key: widget.id,
                className: 'list-item'
              },
              _react2.default.createElement(_WidgetCard2.default, {
                widget: widget,
                properties: {
                  'data-id': widget.id,
                  className: widget.id === selected ? '-selected' : ''
                },
                onClick: _this4.triggerClick
              })
            );
          }),
          _react2.default.createElement(
            'li',
            {
              className: 'list-item'
            },
            _react2.default.createElement(_WidgetCard2.default, {
              widget: {
                name: 'New'
              },
              properties: {},
              onClick: this.triggerClick
            })
          )
        )
      );
    }
  }]);

  return WidgetList;
}(_react2.default.Component);

WidgetList.propTypes = {
  application: _react2.default.PropTypes.array.isRequired,
  dataset: _react2.default.PropTypes.object.isRequired,
  selected: _react2.default.PropTypes.string,
  onChange: _react2.default.PropTypes.func
};

exports.default = WidgetList;