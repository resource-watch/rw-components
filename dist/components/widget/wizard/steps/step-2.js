'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Step2 = require('../../form/steps/Step1');

var _Step3 = _interopRequireDefault(_Step2);

var _Title = require('../../../ui/Title');

var _Title2 = _interopRequireDefault(_Title);

var _WidgetList = require('../../../widget/WidgetList');

var _WidgetList2 = _interopRequireDefault(_WidgetList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Step2 = function (_Step) {
  _inherits(Step2, _Step);

  function Step2() {
    _classCallCheck(this, Step2);

    return _possibleConstructorReturn(this, (Step2.__proto__ || Object.getPrototypeOf(Step2)).apply(this, arguments));
  }

  _createClass(Step2, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var wizard = this.props.wizard;

      return _react2.default.createElement(
        'fieldset',
        { className: 'c-field-container' },
        _react2.default.createElement(
          _Title2.default,
          { className: '-primary -big' },
          'Select a widget or create a new one'
        ),
        _react2.default.createElement(_WidgetList2.default, {
          ref: function ref(c) {
            if (c) _this2.children.push(c);
          },
          dataset: wizard.dataset,
          selected: wizard.widget,
          application: ['rw'],
          onChange: function onChange(value) {
            return _this2.props.onChange({ widget: value });
          }
        })
      );
    }
  }]);

  return Step2;
}(_Step3.default);

Step2.propTypes = {
  wizard: _react2.default.PropTypes.object,
  onChange: _react2.default.PropTypes.func
};

exports.default = Step2;