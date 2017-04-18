'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uniqBy = require('lodash/uniqBy');

var _uniqBy2 = _interopRequireDefault(_uniqBy);

var _flatten = require('lodash/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

var _esDecorators = require('es-decorators');

var _constants = require('./constants');

var _VocabularyItem = require('./VocabularyItem');

var _VocabularyItem2 = _interopRequireDefault(_VocabularyItem);

var _Title = require('../../ui/Title');

var _Title2 = _interopRequireDefault(_Title);

var _Button = require('../../ui/Button');

var _Button2 = _interopRequireDefault(_Button);

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
      datasetID: props.dataset,
      datasetName: '',
      loading: true,
      allVocabularies: [],
      form: Object.assign({}, _constants.STATE_DEFAULT.form, {
        application: props.application,
        authorization: props.authorization,
        language: props.language
      })
    });

    _this.state = newState;
    return _this;
  }

  /**
   * COMPONENT LIFECYCLE
   * - componentWillMount
  */


  _createClass(VocabulariesForm, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.loadAllVocabularies();
    }

    /**
     * UI EVENTS
     * - triggerSubmit
     * - triggerChange
     * - triggerNewVocabulary
     * - handleDissociateVocabulary
    */

  }, {
    key: 'triggerSubmit',
    value: function triggerSubmit(event) {
      var _this2 = this;

      event.preventDefault();

      _constants.FORM_ELEMENTS.validate();

      if (_constants.FORM_ELEMENTS.isFormValid()) {
        // Set a timeout due to the setState function of react
        setTimeout(function () {
          if (!_this2.state.submitting) {
            // Start the submitting
            _this2.setState({ submitting: true });

            var bodyObj = {};
            _this2.state.vocabularies.forEach(function (elem) {
              bodyObj[elem.name] = { tags: elem.tags };
            });

            (0, _request.post)({
              type: 'PUT',
              url: 'https://api.resourcewatch.org/v1/dataset/' + _this2.state.datasetID + '/vocabulary',
              headers: [{ key: 'Content-Type', value: 'application/json' }, { key: 'Authorization', value: _this2.state.form.authorization }],
              body: bodyObj,
              onSuccess: function onSuccess(response) {
                _this2.setState({ submitting: false });
                var successMessage = 'Vocabularies have been updated correctly';
                console.info(response);
                console.info(successMessage);
                alert(successMessage);
              },
              onError: function onError() {
                console.info('Error');
              }
            });
          }
        }, 0);
      }
    }
  }, {
    key: 'triggerChange',
    value: function triggerChange(vocabulary, index) {
      var vocabularies = this.state.vocabularies.slice(0);
      var newAllVocabularies = this.state.allVocabularies.filter(function (elem) {
        return elem.name !== vocabulary.name;
      });

      vocabularies.splice(index, 1, vocabulary);
      this.setState({
        vocabularies: vocabularies,
        allVocabularies: newAllVocabularies
      });
    }
  }, {
    key: 'triggerNewVocabulary',
    value: function triggerNewVocabulary() {
      var vocabularies = this.state.vocabularies;

      if (!vocabularies.find(function (voc) {
        return voc.name === '';
      })) {
        vocabularies.push({ name: '', tags: [] });
        this.setState({ vocabularies: vocabularies });
      }
    }
  }, {
    key: 'handleDissociateVocabulary',
    value: function handleDissociateVocabulary(voc) {
      var _state = this.state,
          vocabularies = _state.vocabularies,
          allVocabularies = _state.allVocabularies;

      var filteredVocabularies = vocabularies.filter(function (elem) {
        return elem.name !== voc.name;
      });
      var newAllVocabularies = allVocabularies.slice(0);
      if (voc.name !== '') {
        newAllVocabularies.push(voc);
      }
      this.setState({
        vocabularies: filteredVocabularies,
        allVocabularies: newAllVocabularies
      });
    }
    /**
    * HELPER FUNCTIONS
    * - loadDatasetVocabularies
    * - loadAllVocabularies
    */

  }, {
    key: 'loadDatasetVocabularies',
    value: function loadDatasetVocabularies() {
      var _this3 = this;

      if (this.state.datasetID) {
        // Start the loading
        this.setState({ loading: true });

        (0, _request.get)({
          url: 'https://api.resourcewatch.org/v1/dataset/' + this.state.datasetID + '?includes=vocabulary&cache=' + Date.now(),
          headers: [{ key: 'Content-Type', value: 'application/json' }],
          onSuccess: function onSuccess(response) {
            var attrs = response.data.attributes;
            var vocabulary = attrs.vocabulary;
            var allVocabularies = _this3.state.allVocabularies;

            var vocabularies = vocabulary.map(function (elem) {
              return elem.attributes;
            });
            var filteredVocabularies = allVocabularies.filter(function (elem) {
              var vocabularyFound = !!vocabularies.find(function (tempVoc) {
                return tempVoc.name === elem.name;
              });
              return !vocabularyFound;
            });
            _this3.setState({
              datasetName: attrs.name,
              vocabularies: vocabularies,
              allVocabularies: filteredVocabularies,
              // Stop the loading
              loading: false
            });
          },
          onError: function onError() {
            console.info('Error');
          }
        });
      }
    }
  }, {
    key: 'loadAllVocabularies',
    value: function loadAllVocabularies() {
      var _this4 = this;

      (0, _request.get)({
        url: 'https://api.resourcewatch.org/v1/vocabulary',
        headers: [{ key: 'Content-Type', value: 'application/json' }],
        onSuccess: function onSuccess(response) {
          var allVocabularies = response.data.map(function (elem) {
            return elem.attributes;
          }).map(function (elem) {
            return {
              name: elem.name,
              tagSet: (0, _uniqBy2.default)((0, _flatten2.default)(elem.resources.map(function (res) {
                return res.tags;
              })), function (e) {
                return e;
              })
            };
          });
          _this4.setState({
            allVocabularies: allVocabularies,
            allVocabulariesNotFiltered: allVocabularies.slice(0)
          }, _this4.loadDatasetVocabularies);
        },
        onError: function onError() {
          console.info('Error');
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _state2 = this.state,
          vocabularies = _state2.vocabularies,
          allVocabularies = _state2.allVocabularies,
          allVocabulariesNotFiltered = _state2.allVocabulariesNotFiltered;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _Title2.default,
          { className: '-huge -p-primary' },
          this.state.datasetName
        ),
        _react2.default.createElement(
          'h1',
          { className: '-p-primary' },
          'Vocabularies'
        ),
        !this.state.loading && _react2.default.createElement(
          _Button2.default,
          {
            onClick: this.triggerNewVocabulary,
            properties: {
              type: 'button',
              className: '-primary'
            }
          },
          'New Vocabulary'
        ),
        _react2.default.createElement(_Spinner2.default, {
          className: '-light',
          isLoading: this.state.loading
        }),
        _react2.default.createElement(
          'form',
          { className: 'c-form', onSubmit: this.triggerSubmit, noValidate: true },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            !this.state.loading && vocabularies.length > 0 && vocabularies.map(function (elem, i) {
              var tempVoc = allVocabulariesNotFiltered.find(function (val) {
                return val.name === elem.name;
              });
              var elemWithTagSet = Object.assign(elem, { tagSet: tempVoc ? tempVoc.tagSet : [] });
              return _react2.default.createElement(
                'div',
                {
                  className: 'small-6 medium-4 column',
                  key: i
                },
                _react2.default.createElement(_VocabularyItem2.default, {
                  index: i,
                  vocabulary: elemWithTagSet,
                  allVocabularies: allVocabularies,
                  onChange: _this5.triggerChange,
                  application: _this5.props.application,
                  authorization: _this5.props.authorization,
                  language: _this5.props.language,
                  onDissociateVocabulary: _this5.handleDissociateVocabulary
                })
              );
            })
          ),
          _react2.default.createElement(
            'ul',
            { className: 'c-field-buttons' },
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _Button2.default,
                {
                  properties: {
                    type: 'submit',
                    name: 'commit',
                    disabled: this.state.loading,
                    className: '-primary ' + (this.state.loading ? '-disabled' : '')
                  }
                },
                'Submit'
              )
            )
          )
        )
      );
    }
  }]);

  return VocabulariesForm;
}(_react2.default.Component), (_applyDecoratedDescriptor(_class.prototype, 'triggerSubmit', [_esDecorators.Autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'triggerSubmit'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'triggerChange', [_esDecorators.Autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'triggerChange'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'triggerNewVocabulary', [_esDecorators.Autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'triggerNewVocabulary'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleDissociateVocabulary', [_esDecorators.Autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'handleDissociateVocabulary'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'loadDatasetVocabularies', [_esDecorators.Autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'loadDatasetVocabularies'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'loadAllVocabularies', [_esDecorators.Autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'loadAllVocabularies'), _class.prototype)), _class);


VocabulariesForm.propTypes = {
  application: _react2.default.PropTypes.string,
  authorization: _react2.default.PropTypes.string,
  language: _react2.default.PropTypes.string,
  dataset: _react2.default.PropTypes.string.isRequired
};

exports.default = VocabulariesForm;