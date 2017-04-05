export const STATE_DEFAULT = {
  step: 1,
  stepLength: 1,
  submitting: false,
  loading: false,
  form: {
    authorization: '',
    status: 1
  },
  vocabularies: [{ id: 'id', tags: [] }]
};

export let FORM_ELEMENTS = {
  validate() {
    Object.keys(this.children).forEach((key) => {
      this.children[key].validate();
    });
  },
  isFormValid() {
    const valid = Object.keys(this.children)
      .map(key => this.children[key].isValid())
      .every(element => element === true);

    return valid;
  },
  children: {}
}
