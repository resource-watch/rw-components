'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('../constants');

var _step = require('./step');

var _step2 = _interopRequireDefault(_step);

var _Field = require('../../../form/Field');

var _Field2 = _interopRequireDefault(_Field);

var _Input = require('../../../form/Input');

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Step2 = function (_Step) {
  _inherits(Step2, _Step);

  function Step2(props) {
    _classCallCheck(this, Step2);

    var _this = _possibleConstructorReturn(this, (Step2.__proto__ || Object.getPrototypeOf(Step2)).call(this, props));

    _this.state = {
      form: props.form
    };

    _this.onLegendChange = _this.onLegendChange.bind(_this);
    return _this;
  }

  /**
   * UI EVENTS
   * - onLegendChange
  */


  _createClass(Step2, [{
    key: 'onLegendChange',
    value: function onLegendChange(obj) {
      var legend = Object.assign({}, this.props.form.legend, obj);
      this.props.onChange({ legend: legend });
    }

    /**
     * HELPERS
     * - getHint
    */

  }, {
    key: 'getHint',
    value: function getHint() {
      var form = this.state.form;

      return _constants.CONNECTOR_TYPES_DICTIONARY[form.connectorType][form.provider].connectorUrlHint;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var hint = this.getHint();
      var _state$form = this.state.form,
          provider = _state$form.provider,
          connectorType = _state$form.connectorType;


      var isDocument = connectorType === 'document';

      var isJson = provider === 'json';
      var isXml = provider === 'xml';
      var isGee = provider === 'gee';

      return _react2.default.createElement(
        'fieldset',
        { className: 'c-field-container' },
        _react2.default.createElement(
          _Field2.default,
          {
            ref: function ref(c) {
              if (c) _constants.FORM_ELEMENTS.elements.step2.connectorUrl = c;
            },
            onChange: function onChange(value) {
              return _this2.props.onChange({ connectorUrl: value });
            },
            validations: isGee ? ['required'] : ['required', 'url'],
            hint: hint,
            properties: {
              name: 'connectorUrl',
              label: 'Url data endpoint',
              type: 'text',
              default: this.state.form.connectorUrl,
              required: true
            }
          },
          _Input2.default
        ),
        (isJson || isXml) && _react2.default.createElement(
          _Field2.default,
          {
            ref: function ref(c) {
              if (c) _constants.FORM_ELEMENTS.elements.step2.dataPath = c;
            },
            onChange: function onChange(value) {
              return _this2.props.onChange({ dataPath: value });
            },
            hint: 'Name of the element that you want to import',
            properties: {
              name: 'dataPath',
              label: 'Data path',
              type: 'text',
              default: this.state.form.dataPath,
              required: isXml
            }
          },
          _Input2.default
        ),
        isDocument && _react2.default.createElement(
          _Field2.default,
          {
            ref: function ref(c) {
              if (c) _constants.FORM_ELEMENTS.elements.step2.lat = c;
            },
            onChange: function onChange(value) {
              return _this2.onLegendChange({ lat: value });
            },
            hint: 'Name of column with latitude value',
            properties: {
              name: 'lat',
              label: 'Latitude',
              type: 'text',
              default: this.state.form.legend.lat
            }
          },
          _Input2.default
        ),
        isDocument && _react2.default.createElement(
          _Field2.default,
          {
            ref: function ref(c) {
              if (c) _constants.FORM_ELEMENTS.elements.step2.long = c;
            },
            onChange: function onChange(value) {
              return _this2.onLegendChange({ long: value });
            },
            hint: 'Name of column with longitude value',
            properties: {
              name: 'long',
              label: 'Longitude',
              type: 'text',
              default: this.state.form.legend.long
            }
          },
          _Input2.default
        ),
        isDocument && _react2.default.createElement(
          _Field2.default,
          {
            ref: function ref(c) {
              if (c) _constants.FORM_ELEMENTS.elements.step2.date = c;
            },
            onChange: function onChange(value) {
              return _this2.onLegendChange({ date: value });
            },
            hint: 'Name of columns with date value (ISO Format)',
            properties: {
              name: 'date',
              label: 'Date',
              type: 'text',
              default: this.state.form.legend.date
            }
          },
          _Input2.default
        ),
        isDocument && _react2.default.createElement(
          _Field2.default,
          {
            ref: function ref(c) {
              if (c) _constants.FORM_ELEMENTS.elements.step2.country = c;
            },
            onChange: function onChange(value) {
              return _this2.onLegendChange({ country: value });
            },
            hint: 'Name of columns with country value (ISO3 code)',
            properties: {
              name: 'country',
              label: 'Country',
              type: 'text',
              default: this.state.form.legend.country
            }
          },
          _Input2.default
        )
      );
    }
  }]);

  return Step2;
}(_step2.default);

Step2.propTypes = {
  dataset: _react2.default.PropTypes.string,
  form: _react2.default.PropTypes.object,
  onChange: _react2.default.PropTypes.func
};

exports.default = Step2;