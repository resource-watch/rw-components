'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('../constants');

var _Field = require('../../../form/Field');

var _Field2 = _interopRequireDefault(_Field);

var _Input = require('../../../form/Input');

var _Input2 = _interopRequireDefault(_Input);

var _SelectInput = require('../../../form/SelectInput');

var _SelectInput2 = _interopRequireDefault(_SelectInput);

var _TextArea = require('../../../form/TextArea');

var _TextArea2 = _interopRequireDefault(_TextArea);

var _Checkbox = require('../../../form/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Title = require('../../../ui/Title');

var _Title2 = _interopRequireDefault(_Title);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Step1 = function (_React$Component) {
  _inherits(Step1, _React$Component);

  function Step1() {
    _classCallCheck(this, Step1);

    return _possibleConstructorReturn(this, (Step1.__proto__ || Object.getPrototypeOf(Step1)).apply(this, arguments));
  }

  _createClass(Step1, [{
    key: 'changeMetadata',
    value: function changeMetadata(obj) {
      var metadata = this.props.metadata;

      var newMetadata = void 0;

      if (obj.info) {
        var info = _extends({}, metadata.info, obj.info);
        newMetadata = _extends({}, metadata, { info: info });
      } else {
        newMetadata = _extends({}, metadata, obj);
      }

      this.props.onChange({ metadata: newMetadata });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'fieldset',
          { className: 'c-field-container' },
          _react2.default.createElement(
            _Title2.default,
            { className: '-default' },
            'Global'
          ),
          _react2.default.createElement(
            _Field2.default,
            {
              ref: function ref(c) {
                if (c) _constants.FORM_ELEMENTS.elements.name = c;
              },
              onChange: function onChange(value) {
                return _this2.changeMetadata({ name: value });
              },
              validations: ['required'],
              properties: {
                name: 'name',
                label: 'Title',
                type: 'text',
                required: true,
                default: this.props.metadata.name
              }
            },
            _Input2.default
          ),
          _react2.default.createElement(
            _Field2.default,
            {
              ref: function ref(c) {
                if (c) _constants.FORM_ELEMENTS.elements.description = c;
              },
              onChange: function onChange(value) {
                return _this2.changeMetadata({ description: value });
              },
              validations: ['required'],
              properties: {
                name: 'description',
                label: 'Description',
                rows: '6',
                required: true,
                default: this.props.metadata.description
              }
            },
            _TextArea2.default
          ),
          _react2.default.createElement(
            _Field2.default,
            {
              ref: function ref(c) {
                if (c) _constants.FORM_ELEMENTS.elements.language = c;
              },
              onChange: function onChange(value) {
                return _this2.changeMetadata({ language: value });
              },
              validations: ['required'],
              options: _constants.LANGUAGE_OPTIONS,
              properties: {
                name: 'language',
                label: 'Data language',
                type: 'text',
                disabled: true,
                required: true,
                default: this.props.metadata.language
              }
            },
            _SelectInput2.default
          ),
          _react2.default.createElement(
            _Field2.default,
            {
              ref: function ref(c) {
                if (c) _constants.FORM_ELEMENTS.elements.wri_funded = c;
              },
              onChange: function onChange(value) {
                return _this2.changeMetadata({ info: { wri_funded: value.checked } });
              },
              properties: {
                name: 'wri_funded',
                label: 'WRI funded',
                title: 'Is this dataset funded by WRI?',
                default: this.props.metadata.info.wri_funded
              }
            },
            _Checkbox2.default
          )
        ),
        _react2.default.createElement(
          'fieldset',
          { className: 'c-field-container' },
          _react2.default.createElement(
            _Title2.default,
            { className: '-default' },
            'Contact'
          ),
          _react2.default.createElement(
            _Field2.default,
            {
              ref: function ref(c) {
                if (c) _constants.FORM_ELEMENTS.elements.contact_person_name = c;
              },
              onChange: function onChange(value) {
                return _this2.changeMetadata({ info: { contact_person_name: value } });
              },
              properties: {
                name: 'contact_person_name',
                label: 'Contact Person Name',
                type: 'text',
                default: this.props.metadata.info.contact_person_name
              }
            },
            _Input2.default
          ),
          _react2.default.createElement(
            _Field2.default,
            {
              ref: function ref(c) {
                if (c) _constants.FORM_ELEMENTS.elements.contact_person_email = c;
              },
              onChange: function onChange(value) {
                return _this2.changeMetadata({ info: { contact_person_email: value } });
              },
              validations: ['email'],
              properties: {
                name: 'contact_person_email',
                label: 'Contact Person Email',
                type: 'text',
                default: this.props.metadata.info.contact_person_email
              }
            },
            _Input2.default
          )
        ),
        _react2.default.createElement(
          'fieldset',
          { className: 'c-field-container' },
          _react2.default.createElement(
            _Title2.default,
            { className: '-default' },
            'Data info'
          ),
          _react2.default.createElement(
            _Field2.default,
            {
              ref: function ref(c) {
                if (c) _constants.FORM_ELEMENTS.elements.function = c;
              },
              onChange: function onChange(value) {
                return _this2.changeMetadata({ info: { 'function': value } });
              },
              hint: 'Briefly describes the purpose of the data and what it represents',
              properties: {
                name: 'function',
                label: 'Function',
                type: 'text',
                rows: '6',
                default: this.props.metadata.info.function
              }
            },
            _TextArea2.default
          ),
          _react2.default.createElement(
            _Field2.default,
            {
              ref: function ref(c) {
                if (c) _constants.FORM_ELEMENTS.elements.cautions = c;
              },
              onChange: function onChange(value) {
                return _this2.changeMetadata({ info: { cautions: value } });
              },
              hint: 'Describes any limitations of the data set that users should be aware of.',
              properties: {
                name: 'cautions',
                label: 'Cautions',
                type: 'text',
                rows: '6',
                default: this.props.metadata.info.cautions
              }
            },
            _TextArea2.default
          ),
          _react2.default.createElement(
            _Field2.default,
            {
              ref: function ref(c) {
                if (c) _constants.FORM_ELEMENTS.elements.citation = c;
              },
              onChange: function onChange(value) {
                return _this2.changeMetadata({ info: { citation: value } });
              },
              hint: 'Unless otherwise specified on Data Sharing Agreement, format should be: Organization name. \u201COfficial data layer name as in the ODP.\u201D Accessed through Resource Watch [date]. www.resourcewatch.org (should always end with: Accessed through Resource Watch on [date]. www.resourcewatch.org)',
              properties: {
                name: 'citation',
                label: 'Citation',
                type: 'text',
                rows: '6',
                default: this.props.metadata.info.citation
              }
            },
            _TextArea2.default
          ),
          _react2.default.createElement(
            _Field2.default,
            {
              ref: function ref(c) {
                if (c) _constants.FORM_ELEMENTS.elements.geographic_coverage = c;
              },
              onChange: function onChange(value) {
                return _this2.changeMetadata({ info: { geographic_coverage: value } });
              },
              hint: 'Describes the spatial extent of the data set (Note: if Global, write Global. If for a select group of countries, list countries in alphabetical order, use Oxford comma, and include \'the\' in country names, e.g., Republic of the Congo)',
              properties: {
                name: 'geographic_coverage',
                label: 'Geographic Coverage',
                type: 'text',
                rows: '6',
                default: this.props.metadata.info.geographic_coverage
              }
            },
            _TextArea2.default
          ),
          _react2.default.createElement(
            _Field2.default,
            {
              ref: function ref(c) {
                if (c) _constants.FORM_ELEMENTS.elements.spatial_resolution = c;
              },
              onChange: function onChange(value) {
                return _this2.changeMetadata({ info: { spatial_resolution: value } });
              },
              hint: 'Describes the spatial resolution, e.g., 50 meters (50 m in parentheses), 500 \xD7 500 meters (note use of times symbol instead of x), 15 arc second/minute/degree',
              properties: {
                name: 'spatial_resolution',
                label: 'Spatial Resolution',
                type: 'text',
                rows: '6',
                default: this.props.metadata.info.spatial_resolution
              }
            },
            _TextArea2.default
          ),
          _react2.default.createElement(
            _Field2.default,
            {
              ref: function ref(c) {
                if (c) _constants.FORM_ELEMENTS.elements.date_of_content = c;
              },
              onChange: function onChange(value) {
                return _this2.changeMetadata({ info: { date_of_content: value } });
              },
              hint: 'Date or time period that the data represents (Select the finest level of content - yearly, monthly, weekly, daily - and Other. Under other list the years for which data is available using four digits, separated by a space and a comma, e.g. 2005, 2010, 2015)',
              properties: {
                name: 'date_of_content',
                label: 'Date of Content',
                type: 'text',
                default: this.props.metadata.info.date_of_content
              }
            },
            _Input2.default
          ),
          _react2.default.createElement(
            _Field2.default,
            {
              ref: function ref(c) {
                if (c) _constants.FORM_ELEMENTS.elements.frequency_of_updates = c;
              },
              onChange: function onChange(value) {
                return _this2.changeMetadata({ info: { frequency_of_updates: value } });
              },
              hint: 'Describes how frequently the data set is updated',
              properties: {
                name: 'frequency_of_updates',
                label: 'Frequency of Updates',
                type: 'text',
                default: this.props.metadata.info.frequency_of_updates
              }
            },
            _Input2.default
          ),
          _react2.default.createElement(
            _Field2.default,
            {
              ref: function ref(c) {
                if (c) _constants.FORM_ELEMENTS.elements.scientific_paper = c;
              },
              onChange: function onChange(value) {
                return _this2.changeMetadata({ info: { scientific_paper: value } });
              },
              properties: {
                name: 'scientific_paper',
                label: 'Scientific Paper',
                type: 'text',
                default: this.props.metadata.info.scientific_paper
              }
            },
            _Input2.default
          ),
          _react2.default.createElement(
            _Field2.default,
            {
              ref: function ref(c) {
                if (c) _constants.FORM_ELEMENTS.elements.license = c;
              },
              onChange: function onChange(value) {
                return _this2.changeMetadata({ info: { license: value } });
              },
              hint: 'License under which data are published',
              properties: {
                name: 'license',
                label: 'License',
                type: 'text',
                default: this.props.metadata.info.license
              }
            },
            _Input2.default
          ),
          _react2.default.createElement(
            _Field2.default,
            {
              ref: function ref(c) {
                if (c) _constants.FORM_ELEMENTS.elements.license_link = c;
              },
              onChange: function onChange(value) {
                return _this2.changeMetadata({ info: { license_link: value } });
              },
              validations: ['url'],
              properties: {
                name: 'license_link',
                label: 'License link',
                type: 'text',
                default: this.props.metadata.info.license_link
              }
            },
            _Input2.default
          ),
          _react2.default.createElement(
            _Field2.default,
            {
              ref: function ref(c) {
                if (c) _constants.FORM_ELEMENTS.elements.source_organization = c;
              },
              onChange: function onChange(value) {
                return _this2.changeMetadata({ info: { source_organization: value } });
              },
              properties: {
                name: 'source_organization',
                label: 'Source Organization',
                type: 'text',
                default: this.props.metadata.info.source_organization
              }
            },
            _Input2.default
          ),
          _react2.default.createElement(
            _Field2.default,
            {
              ref: function ref(c) {
                if (c) _constants.FORM_ELEMENTS.elements.source_organization_link = c;
              },
              onChange: function onChange(value) {
                return _this2.changeMetadata({ info: { source_organization_link: value } });
              },
              validations: ['url'],
              properties: {
                name: 'source_organization_link',
                label: 'Source Organization Link',
                type: 'text',
                default: this.props.metadata.info.source_organization_link
              }
            },
            _Input2.default
          )
        ),
        _react2.default.createElement(
          'fieldset',
          { className: 'c-field-container' },
          _react2.default.createElement(
            _Title2.default,
            { className: '-default' },
            'Translated'
          ),
          _react2.default.createElement(
            _Field2.default,
            {
              ref: function ref(c) {
                if (c) _constants.FORM_ELEMENTS.elements.translated_title = c;
              },
              onChange: function onChange(value) {
                return _this2.changeMetadata({ info: { translated_title: value } });
              },
              properties: {
                name: 'translated_title',
                label: 'Translated Title',
                type: 'text',
                default: this.props.metadata.info.translated_title
              }
            },
            _Input2.default
          ),
          _react2.default.createElement(
            _Field2.default,
            {
              ref: function ref(c) {
                if (c) _constants.FORM_ELEMENTS.elements.translated_function = c;
              },
              onChange: function onChange(value) {
                return _this2.changeMetadata({ info: { translated_function: value } });
              },
              hint: 'Briefly describes the purpose of the data and what it represents',
              properties: {
                name: 'translated_function',
                label: 'Translated Function',
                type: 'text',
                rows: '6',
                default: this.props.metadata.info.translated_function
              }
            },
            _TextArea2.default
          ),
          _react2.default.createElement(
            _Field2.default,
            {
              ref: function ref(c) {
                if (c) _constants.FORM_ELEMENTS.elements.translated_description = c;
              },
              onChange: function onChange(value) {
                return _this2.changeMetadata({ info: { translated_description: value } });
              },
              hint: 'Briefly describes the purpose of the data and what it represents',
              properties: {
                name: 'translated_description',
                label: 'Translated Description',
                type: 'text',
                rows: '6',
                default: this.props.metadata.info.translated_description
              }
            },
            _TextArea2.default
          )
        ),
        _react2.default.createElement(
          'fieldset',
          { className: 'c-field-container' },
          _react2.default.createElement(
            _Title2.default,
            { className: '-default' },
            'Links'
          ),
          _react2.default.createElement(
            _Field2.default,
            {
              ref: function ref(c) {
                if (c) _constants.FORM_ELEMENTS.elements.learn_more_link = c;
              },
              onChange: function onChange(value) {
                return _this2.changeMetadata({ info: { learn_more_link: value } });
              },
              validations: ['url'],
              properties: {
                name: 'learn_more_link',
                label: 'Learn More link',
                type: 'text',
                default: this.props.metadata.info.learn_more_link
              }
            },
            _Input2.default
          ),
          _react2.default.createElement(
            _Field2.default,
            {
              ref: function ref(c) {
                if (c) _constants.FORM_ELEMENTS.elements.data_download_link = c;
              },
              onChange: function onChange(value) {
                return _this2.changeMetadata({ info: { data_download_link: value } });
              },
              validations: ['url'],
              properties: {
                name: 'data_download_link',
                label: 'Data Download link',
                type: 'text',
                default: this.props.metadata.info.data_download_link
              }
            },
            _Input2.default
          ),
          _react2.default.createElement(
            _Field2.default,
            {
              ref: function ref(c) {
                if (c) _constants.FORM_ELEMENTS.elements.data_visualization_link = c;
              },
              onChange: function onChange(value) {
                return _this2.changeMetadata({ info: { data_visualization_link: value } });
              },
              validations: ['url'],
              properties: {
                name: 'data_visualization_link',
                label: 'Data Visualization link',
                type: 'text',
                default: this.props.metadata.info.data_visualization_link
              }
            },
            _Input2.default
          )
        )
      );
    }
  }]);

  return Step1;
}(_react2.default.Component);

Step1.propTypes = {
  metadata: _react2.default.PropTypes.object,
  onChange: _react2.default.PropTypes.func
};

exports.default = Step1;