export const STATE_DEFAULT = {
  step: 1,
  stepLength: 2,
  submitting: false,
  loading: false,

  // Wizard
  wizard: {
    query: '',

    // STEP 4
    filters: [{}],
      // {
      //   selected: {},
      //   filters: {
      //     columnName: 'iso3',
      //     columnType: 'string',
      //     properties: {
      //       values: [
      //         'ARG',
      //         'BRA',
      //         'COL',
      //         'PER',
      //         'VEN'
      //       ]
      //     }
      //   }
      // }

    columns: [],
      // {
      //   columnName: 'cartodb_id',
      //   columnType: 'number',
      //   properties: {
      //     min: 1,
      //     max: 209
      //   }
      // },
      // {
      //   columnName: 'rank',
      //   columnType: 'number',
      //   properties: {
      //     min: 1,
      //     max: 209
      //   }
      // },
      // {
      //   columnName: 'iso3',
      //   columnType: 'string',
      //   properties: {
      //     values: []
      //   }
      // },
      // {
      //   columnName: 'total',
      //   columnType: 'number',
      //   properties: {
      //     min: 0,
      //     max: 5.4430915E9
      //   }
      // },
      // {
      //   columnName: 'country',
      //   columnType: 'string',
      //   properties: {
      //     values: []
      //   }
      // }

    // STEP 5
    chart: '' // bar, pie, line
  }
};

export const FORM_ELEMENTS = {
  elements: {
    step1: {},
    step2: {}
  },
  validate(step) {
    const elements = this.elements[`step${step}`] || this.elements;
    const elementsArray = Object.keys(elements);
    if (elementsArray.length) {
      console.log(elementsArray);
      elementsArray.forEach((k) => {
        elements[k].validate();
      });
    }
  },
  isValid(step) {
    const elements = this.elements[`step${step}`] || this.elements;
    const valid = Object.keys(elements)
      .map(k => elements[k].isValid())
      .filter(v => v !== null)
      .every(element => element);

    return valid;
  }
};
