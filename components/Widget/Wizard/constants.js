export const STATE_DEFAULT = {
  step: 1,
  stepLength: 5,
  submitting: false,
  loading: false,

  // Wizard
  wizard: {
    authorization: '',
    // STEP 1
    dataset: '', // Required
    widget: '', // Optional

    // STEP 2
    metadata: { },

    // STEP 3
    filters: [
      // {
      //   name: 'createdAt',
      //   type: 'date',
      //   max: Date.now(),
      //   min: null
      // }, {
      //   name: '',
      //   type: '',
      //   max: 100,
      //   min: 0
      // }
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
