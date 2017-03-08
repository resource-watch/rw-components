'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validator = function () {
  function Validator() {
    _classCallCheck(this, Validator);

    // Validations
    this.validations = {
      required: {
        regex: /.*\S.*/,
        message: 'The field is required'
      },

      email: {
        regex: /\S+@\S+\.\S+/,
        message: 'The field should be an email'
      },

      url: {
        regex: /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/,
        message: 'The field should be an url: http://example.com'
      }
    };
  }

  _createClass(Validator, [{
    key: 'validate',
    value: function validate(validations, value) {
      var _this = this;

      return validations.map(function (validation) {
        var valid = _this.validations[validation].regex.test(value || '');
        return {
          valid: valid,
          error: !valid ? {
            message: _this.validations[validation].message
          } : null
        };
      });
    }
  }]);

  return Validator;
}();

exports.default = Validator;