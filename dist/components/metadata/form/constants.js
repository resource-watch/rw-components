'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var LANGUAGE_OPTIONS = exports.LANGUAGE_OPTIONS = [{ label: 'English', value: 'en' }, { label: 'Español', value: 'es' }, { label: 'Français', value: 'fr' }, { label: 'Português', value: 'pt' }];

var STATE_DEFAULT = exports.STATE_DEFAULT = {
  step: 1,
  stepLength: 1,
  submitting: false,
  loading: false,
  form: {
    authorization: '',
    source: '',
    description: '',
    name: '',
    language: 'en',
    info: {}
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