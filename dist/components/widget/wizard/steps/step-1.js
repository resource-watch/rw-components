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

var _DatasetList = require('../../../dataset/DatasetList');

var _DatasetList2 = _interopRequireDefault(_DatasetList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Step1 = function (_Step) {
  _inherits(Step1, _Step);

  function Step1() {
    _classCallCheck(this, Step1);

    return _possibleConstructorReturn(this, (Step1.__proto__ || Object.getPrototypeOf(Step1)).apply(this, arguments));
  }

  _createClass(Step1, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'fieldset',
        { className: 'c-field-container' },
        _react2.default.createElement(
          _Title2.default,
          { className: '-primary -big' },
          'Select a dataset'
        ),
        _react2.default.createElement(_DatasetList2.default, {
          ref: function ref(c) {
            if (c) _this2.children.push(c);
          },
          application: ['rw'],
          selected: this.props.wizard.dataset,
          onChange: function onChange(value) {
            return _this2.props.onChange({ dataset: value });
          }
        })
      );
    }
  }]);

  return Step1;
}(_Step3.default);

Step1.propTypes = {
  wizard: _react2.default.PropTypes.object,
  onChange: _react2.default.PropTypes.func
};

exports.default = Step1;