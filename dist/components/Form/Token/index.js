'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTokeninput = require('react-tokeninput');

var _reactTokeninput2 = _interopRequireDefault(_reactTokeninput);

var _without = require('lodash/without');

var _without2 = _interopRequireDefault(_without);

var _uniq = require('lodash/uniq');

var _uniq2 = _interopRequireDefault(_uniq);

var _FormElement2 = require('../FormElement');

var _FormElement3 = _interopRequireDefault(_FormElement2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Token = function (_FormElement) {
  _inherits(Token, _FormElement);

  function Token(props) {
    _classCallCheck(this, Token);

    var _this = _possibleConstructorReturn(this, (Token.__proto__ || Object.getPrototypeOf(Token)).call(this, props));

    _this.state = {
      value: _this.props.properties.default,
      items: _this.props.options || [],
      options: _this.props.options || [],
      selected: _this.props.properties.default.map(function (s) {
        return { id: s, name: s };
      }),
      valid: null,
      error: []
    };

    _this.triggerSelected = _this.triggerSelected.bind(_this);
    _this.triggerRemove = _this.triggerRemove.bind(_this);
    _this.triggerInput = _this.triggerInput.bind(_this);
    return _this;
  }

  /**
   * HELPERS
   * - getSlug
  */


  _createClass(Token, [{
    key: 'getSlug',
    value: function getSlug(string) {
      var st = string;
      st = st.toLowerCase();
      st = st.replace(/[\u00C0-\u00C5]/ig, 'a');
      st = st.replace(/[\u00C8-\u00CB]/ig, 'e');
      st = st.replace(/[\u00CC-\u00CF]/ig, 'i');
      st = st.replace(/[\u00D2-\u00D6]/ig, 'o');
      st = st.replace(/[\u00D9-\u00DC]/ig, 'u');
      st = st.replace(/[\u00D1]/ig, 'n');
      st = st.trim().replace(/ /g, '-');
      st = st.replace(/[^\w\s-]/g, '');
      return st;
    }

    /**
     * UI EVENTS
     * - triggerRemove
     * - triggerSelected
     * - triggerInput
     * - triggerChange
    */

  }, {
    key: 'triggerRemove',
    value: function triggerRemove(value) {
      var selectedOptions = (0, _uniq2.default)((0, _without2.default)(this.state.selected, value));
      this.triggerChange(selectedOptions);
    }
  }, {
    key: 'triggerSelected',
    value: function triggerSelected(value) {
      var newVal = value;
      if (typeof value === 'string') {
        newVal = { id: this.getSlug(value), name: this.getSlug(value) };
      }

      var selectedOptions = (0, _uniq2.default)(this.state.selected.concat([newVal]));
      this.setState({
        selectedToken: null
      });

      this.triggerChange(selectedOptions);
    }
  }, {
    key: 'triggerInput',
    value: function triggerInput(userInput) {
      var _this2 = this;

      this.setState({
        input: userInput,
        loading: true,
        options: []
      });

      setTimeout(function () {
        _this2.filterOptions(_this2.state.input);
        _this2.setState({
          loading: false
        });
      }, 500);
    }
  }, {
    key: 'filterOptions',
    value: function filterOptions(userInput) {
      var items = this.state.items;
      // If the user doesn't write anything return all the options

      if (userInput === '') {
        return this.setState({ options: [] });
      }

      // Define a RegExp
      var regExp = new RegExp('^' + userInput, 'i');

      var filteredNames = items.filter(function (option) {
        return regExp.test(option.label) || regExp.test(option.value);
      });

      return this.setState({ options: filteredNames });
    }
  }, {
    key: 'triggerChange',
    value: function triggerChange(selected) {
      var _this3 = this;

      this.setState({ selected: selected, value: selected.map(function (s) {
          return s.id;
        }) }, function () {
        // Trigger validation
        _this3.triggerValidate();
        // Publish the new value to the form
        if (_this3.props.onChange) _this3.props.onChange(_this3.state.value);
      });
    }
  }, {
    key: 'renderComboboxOptions',
    value: function renderComboboxOptions() {
      var options = this.state.options;

      return options.map(function (option) {
        return _react2.default.createElement(
          _reactTokeninput.Option,
          {
            key: option.value,
            value: option.label
          },
          option.label
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var properties = this.props.properties;
      var _state = this.state;
      var selected = _state.selected;
      var items = _state.items;


      var menuContent = items.length ? this.renderComboboxOptions() : [];

      return _react2.default.createElement(_reactTokeninput2.default, _extends({}, properties, {
        id: 'select-' + properties.name,
        menuContent: menuContent,
        selected: selected,
        onChange: this.triggerChange,
        onSelect: this.triggerSelected,
        onRemove: this.triggerRemove,
        onInput: this.triggerInput,
        placeholder: 'Enter tokens here'
      }));
    }
  }]);

  return Token;
}(_FormElement3.default);

Token.propTypes = {
  properties: _react2.default.PropTypes.object.isRequired,
  options: _react2.default.PropTypes.array,
  hint: _react2.default.PropTypes.string,
  validations: _react2.default.PropTypes.array,
  onChange: _react2.default.PropTypes.func
};

exports.default = Token;