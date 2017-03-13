'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jiminy = require('jiminy');

var _jiminy2 = _interopRequireDefault(_jiminy);

var _constants = require('./constants');

var _Field = require('../../Form/Field');

var _Field2 = _interopRequireDefault(_Field);

var _Select = require('../../Form/Select');

var _Select2 = _interopRequireDefault(_Select);

var _Spinner = require('../../UI/Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

var _DatasetService = require('../../../services/DatasetService');

var _DatasetService2 = _interopRequireDefault(_DatasetService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WidgetPreview = function (_React$Component) {
  _inherits(WidgetPreview, _React$Component);

  function WidgetPreview(props) {
    _classCallCheck(this, WidgetPreview);

    var _this = _possibleConstructorReturn(this, (WidgetPreview.__proto__ || Object.getPrototypeOf(WidgetPreview)).call(this, props));

    _this.state = {
      loading: true,
      graphsTypes: [],
      selected: {
        columns: [],
        type: '',
        graphConfig: {}
      }
    };

    // DatasetService
    _this.datasetService = new _DatasetService2.default(props.wizard.dataset.id, {
      apiURL: 'https://api.resourcewatch.org'
    });

    // BINDINGS
    _this.triggerChangeSelected = _this.triggerChangeSelected.bind(_this);
    return _this;
  }

  _createClass(WidgetPreview, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      this.datasetService.fetchFilteredData(this.props.wizard.query).then(function (data) {
        _this2.setState({
          loading: false,
          data: data
        }, function () {
          _this2.getGraphTypes();
        });
      }).catch(function (err) {
        console.error(err);
        _this2.setState({ loading: false });
      });
    }

    /**
     * HELPERS
     * - getGraphTypes
    */

  }, {
    key: 'getGraphTypes',
    value: function getGraphTypes() {
      /* Finally, you instantiate Jiminy with both the objects */
      var jiminy = new _jiminy2.default(this.state.data, _constants.chartConfig);

      /* You can get recommendations: what graphsTypes you can build with the data: */
      var graphsTypes = jiminy.recommendation(this.state.selected.columns);
      console.log(graphsTypes);
      console.log(this.state.selected.columns);
      this.setState({
        graphsTypes: graphsTypes
      });
      // /*
      //   Returns:
      //   [
      //     'bar',
      //     'pie'
      //   ]
      //  */
      //
      // /* You can ask for the possible graphsTypes which must use (only) some columns: */
      // jiminy.recommendation(['city']);
      // /*
      //   Returns:
      //   [
      //     'pie'
      //   ]
      //  */
      //
      // /* If you already know which graph you want, you can ask Jiminy to give you
      //  * the columns necessary to build it: */
      // jiminy.columns('bar'); /* Returns the choices for the first column */
      // /*
      //   Returns:
      //   [
      //     'city',
      //     'country',
      //     'population'
      //   ]
      //  */
      //
      // jiminy.columns('bar', 'country'); /* And for the second */
      // /*
      //   Returns:
      //   [
      //     'population'
      //   ]
      //  */
    }

    /**
     * UI EVENTS
     * - triggerChangeSelected
    */

  }, {
    key: 'triggerChangeSelected',
    value: function triggerChangeSelected(obj) {
      var _this3 = this;

      var selected = Object.assign({}, this.state.selected, obj);
      console.log(selected);
      this.setState({ selected: selected }, function () {
        _this3.getGraphTypes();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var columns = this.props.wizard.columns;
      var _state = this.state,
          loading = _state.loading,
          graphsTypes = _state.graphsTypes;

      return _react2.default.createElement(
        'div',
        { className: 'c-widgets-preview' },
        _react2.default.createElement(_Spinner2.default, { className: '-light', isLoading: loading }),
        _react2.default.createElement(
          'fieldset',
          { className: 'c-field-container' },
          _react2.default.createElement(
            _Field2.default,
            {
              options: columns.map(function (column) {
                return { label: column.columnName, value: column.columnName };
              }),
              properties: {
                name: 'column',
                label: 'Columns',
                multi: true,
                default: ''
              },
              onChange: function onChange(value) {
                return _this4.triggerChangeSelected({ columns: value });
              }
            },
            _Select2.default
          ),
          !!graphsTypes.length && _react2.default.createElement(
            _Field2.default,
            {
              options: graphsTypes.map(function (graphType) {
                return { label: graphType, value: graphType };
              }),
              properties: {
                name: 'type',
                label: 'Graph types',
                default: ''
              },
              onChange: function onChange(value) {
                return _this4.triggerChangeSelected({ type: value });
              }
            },
            _Select2.default
          )
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