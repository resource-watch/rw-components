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

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VocabularyItem = function (_React$Component) {
  _inherits(VocabularyItem, _React$Component);

  function VocabularyItem(props) {
    _classCallCheck(this, VocabularyItem);

    var _this = _possibleConstructorReturn(this, (VocabularyItem.__proto__ || Object.getPrototypeOf(VocabularyItem)).call(this, props));

    _this.state = { vocabulary: props.vocabulary };

    // BINDINGS
    _this.onTagsChange = _this.onTagsChange.bind(_this);
    return _this;
  }

  _createClass(VocabularyItem, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState({ vocabulary: props.vocabulary });
    }
  }, {
    key: 'onTagsChange',
    value: function onTagsChange(vals) {
      this.props.onChange(this.state.vocabulary.name, { name: this.state.vocabulary.name, tags: vals });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      console.info('render', this.state.vocabulary);
      return _react2.default.createElement(
        'fieldset',
        { className: 'c-field-container c-vocabulary-item' },
        _react2.default.createElement(
          _Field2.default,
          {
            ref: function ref(c) {
              if (c) _constants.FORM_ELEMENTS.children.name = c;
            },
            onChange: function onChange(value) {
              return _this2.props.onChange(_this2.state.vocabulary.name, { name: value, tags: _this2.state.vocabulary.tags });
            },
            validations: ['required'],
            properties: {
              name: 'name',
              label: 'Name',
              type: 'text',
              required: true,
              default: this.state.vocabulary.name
            }
          },
          _Input2.default
        ),
        _react2.default.createElement(
          _Field2.default,
          {
            ref: function ref(c) {
              if (c) _constants.FORM_ELEMENTS.children.tags = c;
            },
            onChange: function onChange(values) {
              return _this2.onTagsChange(values);
            },
            options: this.state.vocabulary.tags.map(function (tag) {
              return { label: tag, value: tag };
            }),
            validations: ['required'],
            selected: this.state.vocabulary.tags,
            properties: {
              name: 'tags',
              label: 'tags',
              creatable: true,
              multi: true,
              required: true,
              default: this.state.vocabulary.tags.map(function (tag) {
                return { label: tag, value: tag };
              })
            }
          },
          _Select2.default
        )
      );
    }
  }]);

  return VocabularyItem;
}(_react2.default.Component);

VocabularyItem.propTypes = {
  vocabulary: _react2.default.PropTypes.object,
  onChange: _react2.default.PropTypes.func
};

exports.default = VocabularyItem;