'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style.scss');

var _step = require('./step');

var _step2 = _interopRequireDefault(_step);

var _Title = require('../../../UI/Title');

var _Title2 = _interopRequireDefault(_Title);

var _Filter = require('../../../Dataset/Filter');

var _Filter2 = _interopRequireDefault(_Filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Step4 = function (_Step) {
  _inherits(Step4, _Step);

  function Step4(props) {
    _classCallCheck(this, Step4);

    // BINDINGS
    var _this = _possibleConstructorReturn(this, (Step4.__proto__ || Object.getPrototypeOf(Step4)).call(this, props));

    _this.triggerChangeColumns = _this.triggerChangeColumns.bind(_this);
    _this.triggerChangeFilters = _this.triggerChangeFilters.bind(_this);
    _this.triggerChangeQuery = _this.triggerChangeQuery.bind(_this);
    return _this;
  }

  _createClass(Step4, [{
    key: 'triggerChangeColumns',
    value: function triggerChangeColumns(columns) {
      this.props.onChange({ columns: columns });
    }
  }, {
    key: 'triggerChangeFilters',
    value: function triggerChangeFilters(obj) {
      this.props.onChange({ filters: obj.map(function (o) {
          return o.filters;
        }) });
    }
  }, {
    key: 'triggerChangeQuery',
    value: function triggerChangeQuery(query) {
      this.props.onChange({ query: query });
    }
  }, {
    key: 'render',
    value: function render() {
      var wizard = this.props.wizard;

      return _react2.default.createElement(
        'fieldset',
        { className: 'c-field-container' },
        _react2.default.createElement(
          _Title2.default,
          { className: '-primary -big' },
          'Filter your dataset'
        ),
        _react2.default.createElement(_Filter2.default, {
          dataset: wizard.dataset,
          onChangeColumns: this.triggerChangeColumns,
          onChangeFilters: this.triggerChangeFilters,
          onChangeQuery: this.triggerChangeQuery
        })
      );
    }
  }]);

  return Step4;
}(_step2.default);

Step4.propTypes = {
  wizard: _react2.default.PropTypes.object,
  onChange: _react2.default.PropTypes.func
};

exports.default = Step4;