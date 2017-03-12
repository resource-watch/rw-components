'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Field = require('../../Form/Field');

var _Field2 = _interopRequireDefault(_Field);

var _Select = require('../../Form/Select');

var _Select2 = _interopRequireDefault(_Select);

require('./style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import Jiminy from 'jiminy';

var WidgetPreview = function (_React$Component) {
  _inherits(WidgetPreview, _React$Component);

  function WidgetPreview(props) {
    _classCallCheck(this, WidgetPreview);

    var _this = _possibleConstructorReturn(this, (WidgetPreview.__proto__ || Object.getPrototypeOf(WidgetPreview)).call(this, props));

    _this.state = {
      selected: {
        columns: [],
        type: '',
        graphConfig: {}
      }
    };
    return _this;
  }

  _createClass(WidgetPreview, [{
    key: 'render',
    value: function render() {
      var columns = this.props.wizard.columns;
      var selected = this.state.selected;

      return _react2.default.createElement(
        'div',
        { className: 'c-widgets-preview' },
        _react2.default.createElement(
          _Field2.default,
          {
            options: columns.map(function (column) {
              return {
                label: column.columnName,
                value: column.columnName
              };
            }),
            properties: {
              name: 'column',
              label: 'Columns',
              multiple: true,
              default: ''
            },
            onChange: this.triggerChangeSelected
          },
          _Select2.default
        )
      );
    }
  }]);

  return WidgetPreview;
}(_react2.default.Component);

WidgetPreview.propTypes = {
  wizard: _react2.default.PropTypes.object.isRequired
};

exports.default = WidgetPreview;