'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var STATE_DEFAULT = exports.STATE_DEFAULT = {
  step: 4,
  stepLength: 5,
  submitting: false,
  loading: false,

  // Wizard
  wizard: {
    authorization: '',
    // STEP 1
    dataset: {
      id: 'd02df2f6-d80c-4274-bb6f-f062061655c4' // Required
    },
    widget: '', // Optional

    // STEP 2
    metadata: {
      technical_title: '',
      title: '',
      subtitle: '',
      source: '',
      functions: '',
      geographic_coverage: '',
      spatial_resolution: '',
      date_of_content: '',
      frequency_of_updates: '',
      cautions: '',
      license: '',
      license_link: '',
      overview: '',
      why: '',
      citation: '',
      other: ''
    },

    // STEP 3
    filters: [
      // {
      //   name: 'createdAt',
      //   type: 'date',
      //   properties: [{
      //    max: Date.now(),
      //    min: null
      //   }]
      // }, ...
    ],

    // STEP 4
    columns: [
      // '', '', ''
    ],
    chart: '', // bar, pie, line

    // FORM SUBMIT
    form: {
      authorization: '',
      name: '',
      queryUrl: '',
      description: '',
      source: '',
      sourceUrl: '',
      authors: '',
      widgetConfig: {},
      status: 1,
      default: true,
      published: true
    }
  }
};