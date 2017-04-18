'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _esDecorators = require('es-decorators');

var _Button = require('../../ui/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Field = require('../../form/Field');

var _Field2 = _interopRequireDefault(_Field);

var _SelectInput = require('../../form/SelectInput');

var _SelectInput2 = _interopRequireDefault(_SelectInput);

var _VocabularySelector = require('./VocabularySelector');

var _VocabularySelector2 = _interopRequireDefault(_VocabularySelector);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var VocabularyItem = (_class = function (_React$Component) {
  _inherits(VocabularyItem, _React$Component);

  function VocabularyItem(props) {
    _classCallCheck(this, VocabularyItem);

    var _this = _possibleConstructorReturn(this, (VocabularyItem.__proto__ || Object.getPrototypeOf(VocabularyItem)).call(this, props));

    var vocabulary = props.vocabulary;

    _this.state = {
      vocabulary: vocabulary,
      selectedTags: vocabulary.tags,
      tagSet: vocabulary.tagSet
    };
    return _this;
  }

  /**
   * COMPONENT LIFECYCLE
   * - componentWillReceiveProps
  */


  _createClass(VocabularyItem, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var vocabulary = props.vocabulary;
      this.setState({
        vocabulary: vocabulary,
        selectedTags: vocabulary.tags || []
      });
    }
    /**
    * UI EVENTS
    * - triggerDissociateVocabulary
    * - triggerTagsChange
    * - triggerVocabularyChange
    */

  }, {
    key: 'triggerDissociateVocabulary',
    value: function triggerDissociateVocabulary() {
      this.props.onDissociateVocabulary(this.state.vocabulary);
    }
  }, {
    key: 'triggerTagsChange',
    value: function triggerTagsChange(vals) {
      var vocabularyUpdated = Object.assign(this.state.vocabulary, { tags: vals });

      this.setState({
        vocabulary: vocabularyUpdated,
        selectedTags: vals
      }, this.props.onChange(this.state.vocabulary, this.props.index));
    }
  }, {
    key: 'triggerVocabularyChange',
    value: function triggerVocabularyChange(value) {
      var _this2 = this;

      this.setState({
        vocabulary: value,
        tagSet: value.tagSet,
        selectedTags: []
      }, function () {
        return _this2.props.onChange(value, _this2.props.index);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var allVocabularies = this.props.allVocabularies;
      var _state = this.state,
          tagSet = _state.tagSet,
          vocabulary = _state.vocabulary,
          selectedTags = _state.selectedTags;


      return _react2.default.createElement(
        'div',
        { className: 'c-vocabulary-item' },
        _react2.default.createElement(
          'fieldset',
          { className: 'c-field-container' },
          _react2.default.createElement(_VocabularySelector2.default, {
            onChange: this.triggerVocabularyChange,
            disableOnSelect: true,
            vocabulary: vocabulary,
            allVocabularies: allVocabularies
          }),
          _react2.default.createElement(
            _Field2.default,
            {
              ref: function ref(c) {
                if (c) _constants.FORM_ELEMENTS.children.tags = c;
              },
              onChange: function onChange(value) {
                return _this3.triggerTagsChange(value);
              },
              options: tagSet.map(function (val) {
                return { label: val, value: val };
              }),
              validations: ['required'],
              selected: selectedTags.map(function (tag) {
                return { label: tag, value: tag };
              }),
              properties: {
                name: 'tags',
                label: 'tags',
                multi: true,
                required: true,
                default: selectedTags.map(function (tag) {
                  return { label: tag, value: tag };
                }),
                value: selectedTags.map(function (tag) {
                  return { label: tag, value: tag };
                })
              }
            },
            _SelectInput2.default
          ),
          _react2.default.createElement(
            _Button2.default,
            {
              onClick: this.triggerDissociateVocabulary,
              properties: {
                type: 'button',
                name: 'dissociate',
                className: '-primary'
              }
            },
            'Dissociate Vocabulary'
          )
        )
      );
    }
  }]);

  return VocabularyItem;
}(_react2.default.Component), (_applyDecoratedDescriptor(_class.prototype, 'triggerDissociateVocabulary', [_esDecorators.Autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'triggerDissociateVocabulary'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'triggerTagsChange', [_esDecorators.Autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'triggerTagsChange'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'triggerVocabularyChange', [_esDecorators.Autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'triggerVocabularyChange'), _class.prototype)), _class);


VocabularyItem.propTypes = {
  vocabulary: _react2.default.PropTypes.object,
  allVocabularies: _react2.default.PropTypes.array,
  onChange: _react2.default.PropTypes.func,
  onDissociateVocabulary: _react2.default.PropTypes.func,
  index: _react2.default.PropTypes.number
};

exports.default = VocabularyItem;