'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('./constants');

var _Title = require('../../UI/Title');

var _Title2 = _interopRequireDefault(_Title);

var _VocabularyItem = require('./VocabularyItem');

var _VocabularyItem2 = _interopRequireDefault(_VocabularyItem);

var _Button = require('../../UI/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VocabulariesForm = function (_React$Component) {
  _inherits(VocabulariesForm, _React$Component);

  function VocabulariesForm(props) {
    _classCallCheck(this, VocabulariesForm);

    var _this = _possibleConstructorReturn(this, (VocabulariesForm.__proto__ || Object.getPrototypeOf(VocabulariesForm)).call(this, props));

    var newState = Object.assign({}, _constants.STATE_DEFAULT, {
      datasetID: props.dataset,
      datasetName: '',
      form: Object.assign({}, _constants.STATE_DEFAULT.form, {
        application: props.application,
        authorization: props.authorization,
        language: props.language
      })
    });

    _this.state = newState;

    _this.onSubmit = _this.onSubmit.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    _this.createNewVocabulary = _this.createNewVocabulary.bind(_this);
    return _this;
  }

  _createClass(VocabulariesForm, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      if (this.state.datasetID) {
        // Start the loading
        this.setState({ loading: true });

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', 'https://api.resourcewatch.org/v1/dataset/' + this.state.datasetID + '?includes=vocabulary&cache=' + Date.now());
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.setRequestHeader('Authorization', this.state.form.authorization);
        xmlhttp.send();

        xmlhttp.onreadystatechange = function () {
          if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200 || xmlhttp.status === 201) {
              var response = JSON.parse(xmlhttp.responseText);
              var attrs = response.data.attributes;
              var vocabularyArray = attrs.vocabulary;
              if (attrs.vocabulary.length === 0) {
                vocabularyArray = _constants.STATE_DEFAULT.vocabularies;
              }
              _this2.setState({
                hasVocabularies: attrs.vocabulary.length !== 0,
                datasetName: attrs.name,
                vocabularies: vocabularyArray,
                // Stop the loading
                loading: false
              });
            } else {
              console.info('Error');
            }
          }
        };
      }
    }

    /**
     * UI EVENTS
     * - onSubmit
     * - onChange
    */

  }, {
    key: 'onSubmit',
    value: function onSubmit(event) {
      var _this3 = this;

      event.preventDefault();

      _constants.FORM_ELEMENTS.validate();

      if (_constants.FORM_ELEMENTS.isFormValid()) {
        // Set a timeout due to the setState function of react
        setTimeout(function () {
          if (!_this3.state.submitting) {
            // Start the submitting
            _this3.setState({ submitting: true });
            // Set the request
            // Send the request
            var xmlhttp = new XMLHttpRequest();
            var xmlhttpOptions = {
              // type: (this.state.hasVocabularies) ? 'PATCH' : 'POST',
              type: 'POST',
              authorization: _this3.state.form.authorization,
              contentType: 'application/json',
              omit: ['authorization']
            };
            xmlhttp.open(xmlhttpOptions.type, 'https://api.resourcewatch.org/v1/dataset/' + _this3.state.datasetID + '/vocabulary');
            xmlhttp.setRequestHeader('Content-Type', xmlhttpOptions.contentType);
            xmlhttp.setRequestHeader('Authorization', xmlhttpOptions.authorization);
            var bodyObj = {};
            _this3.state.vocabularies.map(function (elem) {
              return bodyObj[elem.attributes.name] = { tags: elem.attributes.tags };
            });
            var body = JSON.stringify(bodyObj);
            xmlhttp.send(body);
            xmlhttp.onreadystatechange = function () {
              if (xmlhttp.readyState === 4) {
                // Stop the submitting
                _this3.setState({ submitting: false });
                if (xmlhttp.status === 200 || xmlhttp.status === 201) {
                  var response = JSON.parse(xmlhttp.responseText);
                  var successMessage = 'Vocabularies have been uploaded correctly';
                  console.info(response);
                  console.info(successMessage);
                  alert(successMessage);
                } else {
                  console.info('Error', xmlhttp);
                }
              }
            };
          }
        }, 0);
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(vocabularyName, obj) {
      var vocabularies = this.state.vocabularies.slice(0);
      var newVocabularies = vocabularies.map(function (elem) {
        if (elem.attributes.name === vocabularyName) {
          return { attributes: { name: obj.name, tags: obj.tags } };
        } else {
          return elem;
        }
      });
      this.setState({ vocabularies: newVocabularies }, console.info('this.state', this.state));
    }
  }, {
    key: 'createNewVocabulary',
    value: function createNewVocabulary() {
      var vocabularies = this.state.vocabularies;

      vocabularies.push({ attributes: { name: 'name', tags: [] } });
      this.setState({ vocabularies: vocabularies });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var vocabularies = this.state.vocabularies;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _Title2.default,
          { className: '-huge -p-primary' },
          this.state.datasetName
        ),
        _react2.default.createElement(
          _Title2.default,
          { className: '-p-primary' },
          'Vocabularies'
        ),
        _react2.default.createElement(
          _Button2.default,
          {
            onClick: this.createNewVocabulary,
            properties: {
              type: 'button',
              className: '-primary'
            }
          },
          'New Vocabulary'
        ),
        _react2.default.createElement(
          'form',
          { className: 'c-form', onSubmit: this.onSubmit, noValidate: true },
          this.state.loading && 'loading',
          !this.state.loading && vocabularies.length > 0 && vocabularies.map(function (elem) {
            return _react2.default.createElement(_VocabularyItem2.default, {
              vocabulary: elem.attributes,
              onChange: _this4.onChange
            });
          }),
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
}(_react2.default.Component);

VocabulariesForm.propTypes = {
  application: _react2.default.PropTypes.string,
  authorization: _react2.default.PropTypes.string,
  language: _react2.default.PropTypes.string,
  dataset: _react2.default.PropTypes.string.isRequired
};

exports.default = VocabulariesForm;