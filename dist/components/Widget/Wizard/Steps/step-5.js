'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _step = require('./step');

var _step2 = _interopRequireDefault(_step);

var _Title = require('../../../ui/Title');

var _Title2 = _interopRequireDefault(_Title);

var _WidgetPreview = require('../../preview/WidgetPreview');

var _WidgetPreview2 = _interopRequireDefault(_WidgetPreview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Step5 = function (_Step) {
  _inherits(Step5, _Step);

  function Step5() {
    _classCallCheck(this, Step5);

    return _possibleConstructorReturn(this, (Step5.__proto__ || Object.getPrototypeOf(Step5)).apply(this, arguments));
  }

  _createClass(Step5, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'fieldset',
        { className: 'c-field-container' },
        _react2.default.createElement(
          _Title2.default,
          { className: '-primary -big' },
          'Preview'
        ),
        _react2.default.createElement(_WidgetPreview2.default, {
          wizard: this.props.wizard
        })
      );
    }
  }]);

  return Step5;
}(_step2.default);

Step5.propTypes = {
  wizard: _react2.default.PropTypes.object
};

exports.default = Step5;