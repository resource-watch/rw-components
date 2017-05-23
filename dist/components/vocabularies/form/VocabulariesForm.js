'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _esDecorators = require('es-decorators');

var _sortBy = require('lodash/sortBy');

var _sortBy2 = _interopRequireDefault(_sortBy);

var _constants = require('./constants');

var _Button = require('../../ui/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Field = require('../../form/Field');

var _Field2 = _interopRequireDefault(_Field);

var _Input = require('../../form/Input');

var _Input2 = _interopRequireDefault(_Input);

var _VocabulariesTable = require('../table/VocabulariesTable');

var _VocabulariesTable2 = _interopRequireDefault(_VocabulariesTable);

var _Spinner = require('../../ui/Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

var _request = require('../../../utils/request');

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

var VocabulariesForm = (_class = function (_React$Component) {
  _inherits(VocabulariesForm, _React$Component);

  function VocabulariesForm(props) {
    _classCallCheck(this, VocabulariesForm);

    var _this = _possibleConstructorReturn(this, (VocabulariesForm.__proto__ || Object.getPrototypeOf(VocabulariesForm)).call(this, props));

    var newState = Object.assign({}, _constants.STATE_DEFAULT, {
      loading: true,
      submitting: false,
      vocabularies: [],
      newVocabularyName: '',
      newVocabularyForm: false,
      form: Object.assign({}, _constants.STATE_DEFAULT.form, {
        application: props.application,
        authorization: props.authorization,
        language: props.language
      })
    });

    _this.state = newState;
    return _this;
  }

  _createClass(VocabulariesForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getVocabularies();
    }

    /**
     * HELPERS
     * - getVocabularies
    */

  }, {
    key: 'getVocabularies',
    value: function getVocabularies() {
      var _this2 = this;

      var url = 'https://api.resourcewatch.org/v1/vocabulary';

      (0, _request.get)({
        url: url,
        headers: [],
        onSuccess: function onSuccess(response) {
          var vocabularies = (0, _sortBy2.default)(response.data.map(function (vocabulary) {
            return { name: vocabulary.id };
          }), 'id');
          _this2.setState({ vocabularies: vocabularies, loading: false });
        },
        onError: function onError() {
          _this2.setState({ message: 'Error loading vocabularies', loading: false });
        }
      });
    }

    /**
     * UI EVENTS
     * - triggerNewVocabulary
    */

  }, {
    key: 'triggerNewVocabulary',
    value: function triggerNewVocabulary() {
      this.setState({ newVocabularyForm: true });
    }
  }, {
    key: 'triggerSubmitNewVocabulary',
    value: function triggerSubmitNewVocabulary(e) {
      var _this3 = this;

      e.preventDefault();
      this.setState({ submitting: true });
      (0, _request.post)({
        url: 'https://api.resourcewatch.org/v1/vocabulary',
        headers: [{
          key: 'Content-Type', value: 'application/json'
        }, {
          key: 'Authorization', value: this.props.authorization
        }],
        body: { name: this.state.newVocabularyName },
        onSuccess: function onSuccess(data) {
          var vocabularies = _this3.state.vocabularies.slice(0);
          vocabularies.push({ name: data.data[0].id });
          _this3.setState({
            vocabularies: vocabularies,
            submitting: false,
            newVocabularyForm: false
          });
        },
        onError: function onError() {
          _this3.setState({ message: 'Error creating the vocabulary', submitting: false });
        }
      });
    }
  }, {
    key: 'triggerCancelNewVocabulary',
    value: function triggerCancelNewVocabulary() {
      this.setState({ newVocabularyForm: false });
    }
  }, {
    key: 'changeVocabularyName',
    value: function changeVocabularyName(value) {
      this.setState({ newVocabularyName: value });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          application = _props.application,
          authorization = _props.authorization;
      var _state = this.state,
          vocabularies = _state.vocabularies,
          loading = _state.loading,
          newVocabularyForm = _state.newVocabularyForm,
          submitting = _state.submitting;

      return _react2.default.createElement(
        'div',
        { className: 'c-vocabularies-form' },
        _react2.default.createElement(
          'h1',
          { className: '-p-primary' },
          'Vocabularies'
        ),
        !loading && !newVocabularyForm && _react2.default.createElement(
          'div',
          { className: 'actions' },
          _react2.default.createElement(
            _Button2.default,
            {
              onClick: this.triggerNewVocabulary,
              properties: {
                type: 'button',
                className: '-primary -end'
              }
            },
            'New Vocabulary'
          )
        ),
        newVocabularyForm && _react2.default.createElement(
          'div',
          { className: 'new-vocabulary-form' },
          _react2.default.createElement(
            'form',
            { className: 'c-form', onSubmit: this.triggerSubmitNewVocabulary },
            _react2.default.createElement(_Spinner2.default, { className: '-light', isLoading: this.state.submitting }),
            _react2.default.createElement(
              _Field2.default,
              {
                ref: function ref(c) {
                  if (c) _constants.FORM_ELEMENTS.name = c;
                },
                onChange: function onChange(value) {
                  return _this4.changeVocabularyName(value);
                },
                validations: ['required'],
                properties: {
                  name: 'name',
                  label: 'Vocabulary name',
                  type: 'text',
                  required: true,
                  default: ''
                }
              },
              _Input2.default
            ),
            _react2.default.createElement(
              'div',
              { className: 'button-bar' },
              _react2.default.createElement(
                _Button2.default,
                {
                  onClick: this.triggerCancelNewVocabulary,
                  properties: {
                    type: 'button',
                    className: '-secondary -end'
                  }
                },
                'Cancel'
              ),
              _react2.default.createElement(
                _Button2.default,
                {
                  properties: {
                    type: 'submit',
                    disabled: submitting,
                    className: '-primary -end'
                  }
                },
                'Submit'
              )
            )
          )
        ),
        _react2.default.createElement(_Spinner2.default, { className: '-light', isLoading: this.state.loading }),
        _react2.default.createElement(_VocabulariesTable2.default, {
          vocabularies: vocabularies,
          application: application,
          authorization: authorization
        })
      );
    }
  }]);

  return VocabulariesForm;
}(_react2.default.Component), (_applyDecoratedDescriptor(_class.prototype, 'triggerNewVocabulary', [_esDecorators.Autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'triggerNewVocabulary'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'triggerSubmitNewVocabulary', [_esDecorators.Autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'triggerSubmitNewVocabulary'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'triggerCancelNewVocabulary', [_esDecorators.Autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'triggerCancelNewVocabulary'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'changeVocabularyName', [_esDecorators.Autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'changeVocabularyName'), _class.prototype)), _class);


VocabulariesForm.propTypes = {
  application: _react2.default.PropTypes.string,
  authorization: _react2.default.PropTypes.string,
  language: _react2.default.PropTypes.string
};

exports.default = VocabulariesForm;