'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Title = require('../../../ui/Title');

var _Title2 = _interopRequireDefault(_Title);

var _DatasetFilter = require('../../../dataset/DatasetFilter');

var _DatasetFilter2 = _interopRequireDefault(_DatasetFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Step2 = function (_React$Component) {
  _inherits(Step2, _React$Component);

  function Step2(props) {
    _classCallCheck(this, Step2);

    // BINDINGS
    var _this = _possibleConstructorReturn(this, (Step2.__proto__ || Object.getPrototypeOf(Step2)).call(this, props));

    _this.triggerChange = _this.triggerChange.bind(_this);
    return _this;
  }

  _createClass(Step2, [{
    key: 'triggerChange',
    value: function triggerChange(obj) {
      this.props.onChange(obj);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          dataset = _props.dataset,
          wizard = _props.wizard;

      return _react2.default.createElement(
        'fieldset',
        { className: 'c-field-container' },
        _react2.default.createElement(
          _Title2.default,
          { className: '-primary -big' },
          'Filter your dataset'
        ),
        _react2.default.createElement(_DatasetFilter2.default, {
          dataset: dataset,
          wizard: wizard,
          onChange: this.triggerChange
        })
      );
    }
  }]);

  return Step2;
}(_react2.default.Component);

Step2.propTypes = {
  dataset: _react2.default.PropTypes.object,
  wizard: _react2.default.PropTypes.object,
  onChange: _react2.default.PropTypes.func
};

exports.default = Step2;