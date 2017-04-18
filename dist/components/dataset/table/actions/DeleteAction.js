'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _request = require('../../../../utils/request');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeleteAction = function (_React$Component) {
  _inherits(DeleteAction, _React$Component);

  function DeleteAction(props) {
    _classCallCheck(this, DeleteAction);

    // BINDINGS
    var _this = _possibleConstructorReturn(this, (DeleteAction.__proto__ || Object.getPrototypeOf(DeleteAction)).call(this, props));

    _this.onClickDelete = _this.onClickDelete.bind(_this);
    return _this;
  }

  _createClass(DeleteAction, [{
    key: 'onClickDelete',
    value: function onClickDelete(e) {
      var _this2 = this;

      var data = this.props.data;

      e && e.preventDefault() && e.stopPropagation();

      if (confirm('Are you sure that you want to delete the dataset: "' + data.name + '" ')) {
        (0, _request.remove)({
          url: 'https://api.resourcewatch.org/v1/dataset/' + data.id,
          headers: [{
            key: 'Authorization',
            value: this.props.authorization
          }],
          onSuccess: function onSuccess() {
            _this2.props.onRowDelete(data.id);
          },
          onError: function onError() {
            console.error('We can\'t delete the dataset');
          }
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var href = this.props.href;

      return _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(
          'a',
          {
            href: href,
            onClick: this.onClickDelete
          },
          'Remove'
        )
      );
    }
  }]);

  return DeleteAction;
}(_react2.default.Component);

DeleteAction.propTypes = {
  data: _react2.default.PropTypes.object,
  href: _react2.default.PropTypes.string,

  authorization: _react2.default.PropTypes.string,
  onRowDelete: _react2.default.PropTypes.func
};

exports.default = DeleteAction;