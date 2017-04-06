'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var STATE_DEFAULT = exports.STATE_DEFAULT = {
  submitting: false,
  loading: false,
  hasVocabularies: false,
  form: {
    authorization: '',
    status: 1
  },
  vocabularies: [{ attributes: { name: 'name', tags: [] }
  }]
};

var FORM_ELEMENTS = exports.FORM_ELEMENTS = {
  validate: function validate() {
    var _this = this;

    Object.keys(this.children).forEach(function (key) {
      _this.children[key].validate();
    });
  },
  isFormValid: function isFormValid() {
    var _this2 = this;

    var valid = Object.keys(this.children).map(function (key) {
      return _this2.children[key].isValid();
    }).every(function (element) {
      return element === true;
    });

    return valid;
  },

  children: {}
};