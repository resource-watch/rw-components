'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Step = function (_React$Component) {
  _inherits(Step, _React$Component);

  function Step(props) {
    _classCallCheck(this, Step);

    var _this = _possibleConstructorReturn(this, (Step.__proto__ || Object.getPrototypeOf(Step)).call(this, props));

    _this.providerDictionary = _constants.PROVIDER_DICTIONARY;
    _this.children = [];
    return _this;
  }

  _createClass(Step, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      this.children = [];
      return true;
    }
  }, {
    key: 'validate',
    value: function validate() {
      this.children.forEach(function (c) {
        c.validate();
      });
    }
  }, {
    key: 'isValid',
    value: function isValid() {
      var valid = this.children.map(function (c) {
        return c.isValid();
      }).filter(function (v) {
        return v !== null;
      }).every(function (element) {
        return element;
      });

      return valid;
    }
  }]);

  return Step;
}(_react2.default.Component);

Step.propTypes = {};

exports.default = Step;