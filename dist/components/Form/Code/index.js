'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _brace = require('brace');

var _brace2 = _interopRequireDefault(_brace);

var _reactAce = require('react-ace');

var _reactAce2 = _interopRequireDefault(_reactAce);

require('brace/mode/json');

require('brace/theme/github');

var _FormElement2 = require('../FormElement');

var _FormElement3 = _interopRequireDefault(_FormElement2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Code = function (_FormElement) {
  _inherits(Code, _FormElement);

  function Code(props) {
    _classCallCheck(this, Code);

    var _this = _possibleConstructorReturn(this, (Code.__proto__ || Object.getPrototypeOf(Code)).call(this, props));

    _this.state = {
      value: JSON.stringify(_this.props.properties.default || {}, null, 2),
      valid: null,
      error: []
    };
    return _this;
  }
  /**
   * UI EVENTS
   * - triggerChange
  */


  _createClass(Code, [{
    key: 'triggerChange',
    value: function triggerChange(value) {
      var _this2 = this;

      this.setState({ value: value }, function () {
        try {
          // Trigger validation
          _this2.triggerValidate();
          // Publish the new value to the form
          var parsedValue = JSON.parse(value);
          if (_this2.props.onChange) _this2.props.onChange(parsedValue);
        } catch (err) {
          // console.error(err);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_reactAce2.default, {
        mode: 'json',
        theme: 'github',
        value: this.state.value,
        tabSize: 2,
        editorProps: { $blockScrolling: true },
        onChange: this.triggerChange
      });
    }
  }]);

  return Code;
}(_FormElement3.default);

Code.propTypes = {
  properties: _react2.default.PropTypes.object.isRequired,
  validations: _react2.default.PropTypes.array,
  onChange: _react2.default.PropTypes.func
};

exports.default = Code;