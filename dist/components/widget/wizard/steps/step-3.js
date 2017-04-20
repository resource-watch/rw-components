'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Step2 = require('../../form/steps/Step1');

var _Step3 = _interopRequireDefault(_Step2);

var _Field = require('../../../form/Field');

var _Field2 = _interopRequireDefault(_Field);

var _Input = require('../../../form/Input');

var _Input2 = _interopRequireDefault(_Input);

var _TextArea = require('../../../form/TextArea');

var _TextArea2 = _interopRequireDefault(_TextArea);

var _Title = require('../../../ui/Title');

var _Title2 = _interopRequireDefault(_Title);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Step3 = function (_Step) {
  _inherits(Step3, _Step);

  function Step3() {
    _classCallCheck(this, Step3);

    return _possibleConstructorReturn(this, (Step3.__proto__ || Object.getPrototypeOf(Step3)).apply(this, arguments));
  }

  _createClass(Step3, [{
    key: 'changeMetadata',
    value: function changeMetadata(obj) {
      var metadata = this.props.wizard.metadata;

      var newMetadata = Object.assign({}, metadata, obj);

      this.props.onChange({ metadata: newMetadata });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'fieldset',
        { className: 'c-field-container' },
        _react2.default.createElement(
          _Title2.default,
          { className: '-primary -big' },
          'Metadata'
        ),
        _react2.default.createElement(
          _Field2.default,
          {
            ref: function ref(c) {
              if (c) _this2.children.push(c);
            },
            onChange: function onChange(value) {
              return _this2.changeMetadata({ technical_title: value });
            },
            validations: ['required'],
            hint: 'The tech title is the unique id for each RW data set. It refers to the back-end data management name (or the name given to the data in S3, for example \'cmr_logging\'). See this doc for more information on technical titles: <a target=\'_blank\' href=\'https://docs.google.com/document/d/11pOlf4tC47GWPwQOuswclM3-Trc7fEh0oLUxw-QLBag/edit?usp=sharing\'>Open file</a>',
            properties: {
              name: 'technical_title',
              label: 'Technical Title',
              type: 'text',
              required: true,
              default: this.props.wizard.metadata.technical_title
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
              return _this2.changeMetadata({ title: value });
            },
            hint: 'The official title for display on RW (see style guidelines: https://docs.google.com/document/d/1GtKycexP43BLWpQ56KZhKSMmidpvd-v4s0ajXCQcW48/edit)',
            properties: {
              name: 'title',
              label: 'Title',
              type: 'text',
              default: this.props.wizard.metadata.title
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
              return _this2.changeMetadata({ subtitle: value });
            },
            hint: 'If the title should have a description include it here (e.g., annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
            properties: {
              name: 'subtitle',
              label: 'Subtitle',
              type: 'text',
              default: this.props.wizard.metadata.subtitle
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
              return _this2.changeMetadata({ source: value });
            },
            hint: 'People/organizations that contributed to the data set (separate by commas), or link to the journal article',
            properties: {
              name: 'source',
              label: 'Source',
              type: 'text',
              default: this.props.wizard.metadata.source
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
              return _this2.changeMetadata({ functions: value });
            },
            hint: 'Briefly describes the purpose of the data and what it represents',
            properties: {
              name: 'functions',
              label: 'Function',
              type: 'text',
              default: this.props.wizard.metadata.functions
            }
          },
          _TextArea2.default
        ),
        _react2.default.createElement(
          _Field2.default,
          {
            ref: function ref(c) {
              if (c) _this2.children.push(c);
            },
            onChange: function onChange(value) {
              return _this2.changeMetadata({ geographic_coverage: value });
            },
            hint: 'Describes the spatial extent of the data set (Note: if Global, write Global. If for a select group of countries, list countries in alphabetical order, use Oxford comma, and include \'the\' in country names, e.g., Republic of the Congo)',
            properties: {
              name: 'geographic_coverage',
              label: 'Geographic Coverage',
              type: 'text',
              default: this.props.wizard.metadata.geographic_coverage
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
              return _this2.changeMetadata({ spatial_resolution: value });
            },
            hint: 'Describes the spatial resolution, e.g., 50 meters (50 m in parentheses), 500 \xD7 500 meters (note use of times symbol instead of x), 15 arc second/minute/degree',
            properties: {
              name: 'spatial_resolution',
              label: 'Spatial Resolution',
              type: 'text',
              default: this.props.wizard.metadata.spatial_resolution
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
              return _this2.changeMetadata({ date_of_content: value });
            },
            hint: 'Date or time period that the data represents (Select the finest level of content - yearly, monthly, weekly, daily - and Other. Under other list the years for which data is available using four digits, separated by a space and a comma, e.g. 2005, 2010, 2015)',
            properties: {
              name: 'date_of_content',
              label: 'Date of Content',
              type: 'text',
              default: this.props.wizard.metadata.date_of_content
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
              return _this2.changeMetadata({ frequency_of_updates: value });
            },
            hint: 'Describes how frequently the data set is updated',
            properties: {
              name: 'frequency_of_updates',
              label: 'Frequency of Updates',
              type: 'text',
              default: this.props.wizard.metadata.frequency_of_updates
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
              return _this2.changeMetadata({ cautions: value });
            },
            hint: 'Describes any limitations of the data set that users should be aware of. Use a bulleted list if possible.',
            properties: {
              name: 'cautions',
              label: 'Cautions',
              type: 'text',
              default: this.props.wizard.metadata.cautions
            }
          },
          _TextArea2.default
        ),
        _react2.default.createElement(
          _Field2.default,
          {
            ref: function ref(c) {
              if (c) _this2.children.push(c);
            },
            onChange: function onChange(value) {
              return _this2.changeMetadata({ license: value });
            },
            hint: 'License under which data are published',
            properties: {
              name: 'license',
              label: 'License',
              type: 'text',
              default: this.props.wizard.metadata.license
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
              return _this2.changeMetadata({ license_link: value });
            },
            hint: 'License under which data are published',
            validations: ['url'],
            properties: {
              name: 'license_link',
              label: 'Link to License or ToS',
              type: 'text',
              default: this.props.wizard.metadata.license_link
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
              return _this2.changeMetadata({ overview: value });
            },
            hint: 'Description or abstract of the data and methodology. Include links as appropriate, e.g., source data (Landsat, MODIS, etc.), relevant publications, etc.',
            properties: {
              name: 'overview',
              label: 'Overview',
              type: 'text',
              default: this.props.wizard.metadata.overview
            }
          },
          _TextArea2.default
        ),
        _react2.default.createElement(
          _Field2.default,
          {
            ref: function ref(c) {
              if (c) _this2.children.push(c);
            },
            onChange: function onChange(value) {
              return _this2.changeMetadata({ why: value });
            },
            hint: 'Briefly explain why this data set is being added to the website (e.g, best available for this country, useful for X organization, etc...)',
            properties: {
              name: 'why',
              label: 'Why was this data added to the website?',
              type: 'text',
              default: this.props.wizard.metadata.why
            }
          },
          _TextArea2.default
        ),
        _react2.default.createElement(
          _Field2.default,
          {
            ref: function ref(c) {
              if (c) _this2.children.push(c);
            },
            onChange: function onChange(value) {
              return _this2.changeMetadata({ citation: value });
            },
            hint: 'Unless otherwise specified on Data Sharing Agreement, format should be: Organization name. \u201COfficial data layer name as in the ODP.\u201D Accessed through Resource Watch [date]. www.resourcewatch.org (should always end with: Accessed through Resource Watch on [date]. www.resourcewatch.org)',
            properties: {
              name: 'citation',
              label: 'Citation',
              type: 'text',
              default: this.props.wizard.metadata.citation
            }
          },
          _TextArea2.default
        ),
        _react2.default.createElement(
          _Field2.default,
          {
            ref: function ref(c) {
              if (c) _this2.children.push(c);
            },
            onChange: function onChange(value) {
              return _this2.changeMetadata({ other: value });
            },
            hint: 'If there is a custom field outside the RW metadata standards please enter the text for it here. For example, a \'Tree Cover Density\' field for the 2000 tree cover layer.',
            properties: {
              name: 'other',
              label: 'Other',
              type: 'text',
              default: this.props.wizard.metadata.other
            }
          },
          _TextArea2.default
        )
      );
    }
  }]);

  return Step3;
}(_Step3.default);

Step3.propTypes = {
  wizard: _react2.default.PropTypes.object,
  onChange: _react2.default.PropTypes.func
};

exports.default = Step3;