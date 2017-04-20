'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var STATE_DEFAULT = exports.STATE_DEFAULT = {
  step: 1,
  stepLength: 1,
  submitting: false,
  loading: false,
  form: {
    authorization: '',
    name: '',
    queryUrl: '',
    description: '',
    source: '',
    sourceUrl: '',
    authors: '',
    widgetConfig: {},
    default: false,
    status: 1,
    verified: true,
    published: true
  }
};

var FORM_ELEMENTS = exports.FORM_ELEMENTS = {
  elements: {},
  validate: function validate() {
    var elements = this.elements;
    Object.keys(elements).forEach(function (k) {
      elements[k].validate();
    });
  },
  isValid: function isValid() {
    var elements = this.elements;
    var valid = Object.keys(elements).map(function (k) {
      return elements[k].isValid();
    }).filter(function (v) {
      return v !== null;
    }).every(function (element) {
      return element;
    });

    return valid;
  }
};