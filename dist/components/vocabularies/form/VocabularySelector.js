'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _esDecorators = require('es-decorators');

var _Field = require('../../form/Field');

var _Field2 = _interopRequireDefault(_Field);

var _SelectInput = require('../../form/SelectInput');

var _SelectInput2 = _interopRequireDefault(_SelectInput);

var _request = require('../../../utils/request');

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

var VocabularySelector = (_class = function (_React$Component) {
  _inherits(VocabularySelector, _React$Component);

  function VocabularySelector(props) {
    _classCallCheck(this, VocabularySelector);

    var _this = _possibleConstructorReturn(this, (VocabularySelector.__proto__ || Object.getPrototypeOf(VocabularySelector)).call(this, props));

    var allVocabularies = props.allVocabularies;


    _this.state = {
      vocabularies: allVocabularies || [],
      disabled: false,
      selected: null,
      form: {
        application: props.application,
        authorization: props.authorization,
        language: props.language
      }
    };
    return _this;
  }

  /**
   * COMPONENT LIFECYCLE
   * - componentWillMount
   * - componentWillReceiveProps
  */


  _createClass(VocabularySelector, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          vocabulary = _props.vocabulary,
          allVocabularies = _props.allVocabularies;


      if (!allVocabularies) {
        this.loadVocabularies();
      }
      if (vocabulary.name !== '') {
        this.setState({
          disabled: true,
          selected: { label: vocabulary.name, value: vocabulary }
        });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var selectedVal = { label: props.vocabulary.name, value: props.vocabulary };
      this.setState({
        vocabularies: [props.vocabulary],
        disabled: true,
        selected: selectedVal,
        form: {
          application: props.application,
          authorization: props.authorization,
          language: props.language
        }
      });
    }

    /**
    * UI EVENTS
    * triggerChange
    */

  }, {
    key: 'triggerChange',
    value: function triggerChange(value) {
      var newSelected = value ? { label: value.name, value: value } : null;
      this.setState({
        selected: newSelected,
        disabled: this.props.disableOnSelect
      });
      this.props.onChange(value);
    }

    /**
    * HELPER FUNCTIONS
    * loadVocabularies
    */

  }, {
    key: 'loadVocabularies',
    value: function loadVocabularies() {
      var _this2 = this;

      (0, _request.get)({
        url: 'https://api.resourcewatch.org/v1/vocabulary',
        headers: [{ key: 'Content-Type', value: 'application/json' }],
        onSuccess: function onSuccess(response) {
          _this2.setState({
            vocabularies: response.data.map(function (elem) {
              return elem.attributes;
            }),
            // Stop the loading
            loading: false
          });
        },
        onError: function onError() {
          console.info('Error');
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          selected = _state.selected,
          disabled = _state.disabled;

      return _react2.default.createElement(
        _Field2.default,
        {
          ref: function ref(c) {
            if (c) _constants.FORM_ELEMENTS.children.tags = c;
          },
          onChange: function onChange(value) {
            return _this3.triggerChange(value);
          },
          options: this.state.vocabularies.map(function (vocabulary) {
            return { label: vocabulary.name, value: vocabulary };
          }),
          validations: ['required'],

          properties: {
            name: 'vocabulary',
            label: 'Vocabulary',
            required: true,
            value: selected,
            default: selected,
            disabled: disabled
          }
        },
        _SelectInput2.default
      );
    }
  }]);

  return VocabularySelector;
}(_react2.default.Component), (_applyDecoratedDescriptor(_class.prototype, 'triggerChange', [_esDecorators.Autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'triggerChange'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'loadVocabularies', [_esDecorators.Autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'loadVocabularies'), _class.prototype)), _class);


VocabularySelector.propTypes = {
  onChange: _react2.default.PropTypes.func,
  application: _react2.default.PropTypes.string,
  authorization: _react2.default.PropTypes.string,
  language: _react2.default.PropTypes.string,
  disableOnSelect: _react2.default.PropTypes.bool,
  vocabulary: _react2.default.PropTypes.object,
  allVocabularies: _react2.default.PropTypes.array
};

exports.default = VocabularySelector;