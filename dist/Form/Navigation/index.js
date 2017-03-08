'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('../../UI/Button');

var _Button2 = _interopRequireDefault(_Button);

require('./style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navigation = function (_React$Component) {
  _inherits(Navigation, _React$Component);

  function Navigation(props) {
    _classCallCheck(this, Navigation);

    var _this = _possibleConstructorReturn(this, (Navigation.__proto__ || Object.getPrototypeOf(Navigation)).call(this, props));

    _this.state = {
      step: props.step,
      stepLength: props.stepLength
    };

    _this.onBack = _this.onBack.bind(_this);
    return _this;
  }

  /**
   * UI EVENTS
   * - onBack
  */


  _createClass(Navigation, [{
    key: 'onBack',
    value: function onBack(e) {
      e.preventDefault();

      // Send the step to the form
      if (this.props.onBack) this.props.onBack(this.props.step - 1);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          step = _props.step,
          stepLength = _props.stepLength,
          submitting = _props.submitting;

      return _react2.default.createElement(
        'ul',
        { className: 'c-field-buttons' },
        step !== 1 && _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            _Button2.default,
            {
              properties: {
                type: 'button',
                name: 'commit',
                className: '-primary'
              },
              onClick: this.onBack
            },
            'Back'
          )
        ),
        step !== stepLength && _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            _Button2.default,
            {
              properties: {
                type: 'submit',
                name: 'commit',
                className: '-primary'
              }
            },
            'Next'
          )
        ),
        step === stepLength && _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            _Button2.default,
            {
              properties: {
                type: 'submit',
                name: 'commit',
                disabled: submitting,
                className: '-primary ' + (submitting ? '-disabled' : '')
              }
            },
            'Submit'
          )
        )
      );
    }
  }]);

  return Navigation;
}(_react2.default.Component);

Navigation.propTypes = {
  step: _react2.default.PropTypes.number,
  stepLength: _react2.default.PropTypes.number,
  submitting: _react2.default.PropTypes.bool,
  onBack: _react2.default.PropTypes.func
};

exports.default = Navigation;