'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Field = require('../../Form/Field');

var _Field2 = _interopRequireDefault(_Field);

var _Input = require('../../Form/Input');

var _Input2 = _interopRequireDefault(_Input);

var _Select = require('../../Form/Select');

var _Select2 = _interopRequireDefault(_Select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VocabularyForm = function (_React$Component) {
  _inherits(VocabularyForm, _React$Component);

  function VocabularyForm(props) {
    _classCallCheck(this, VocabularyForm);

    var _this = _possibleConstructorReturn(this, (VocabularyForm.__proto__ || Object.getPrototypeOf(VocabularyForm)).call(this, props));

    _this.state = { vocabulary: props.vocabulary };
    // BINDINGS
    return _this;
  }

  _createClass(VocabularyForm, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'fieldset',
        { className: 'c-field-container' },
        _react2.default.createElement(
          _Field2.default,
          {
            ref: function ref(c) {
              if (c) _this2.children.push(c);
            },
            onChange: function onChange(value) {
              return _this2.props.onChange({ id: value });
            },
            validations: ['required'],
            properties: {
              name: 'id',
              label: 'ID',
              type: 'text',
              required: true,
              default: this.state.vocabulary.id
            }
          },
          _Input2.default
        ),
        _react2.default.createElement(
          _Field2.default,
          {
            ref: function ref(c) {
              if (c) _this2.children.push(c);
            },
            onChange: function onChange(value) {
              return _this2.props.onChange({ id: value });
            },
            options: this.state.vocabulary.tags,
            properties: {
              name: 'tags',
              label: 'tags',
              creatable: true,
              multi: true,
              value: this.state.vocabulary.tags
            }
          },
          _Select2.default
        )
      );
    }
  }]);

  return VocabularyForm;
}(_react2.default.Component);

VocabularyForm.propTypes = {
  vocabulary: _react2.default.PropTypes.object,
  onChange: _react2.default.PropTypes.func
};

exports.default = VocabularyForm;