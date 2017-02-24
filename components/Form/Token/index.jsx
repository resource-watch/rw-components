import React from 'react';
import TokenInput from 'react-tokeninput';
import without from 'lodash/without';
import uniq from 'lodash/uniq';

import FormElement from '../FormElement';

import './style.scss';

class Token extends FormElement {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.properties.default,
      selected: this.props.properties.default.map((s) => {
        return { id: s, name: s };
      }),
      valid: null,
      error: []
    };

    this.triggerSelected = this.triggerSelected.bind(this);
    this.triggerRemove = this.triggerRemove.bind(this);
    this.triggerInput = this.triggerInput.bind(this);
  }

  /**
   * HELPERS
   * - getSlug
  */
  getSlug(string) {
    let st = string;
    st = st.toLowerCase();
    st = st.replace(/[\u00C0-\u00C5]/ig, 'a');
    st = st.replace(/[\u00C8-\u00CB]/ig, 'e');
    st = st.replace(/[\u00CC-\u00CF]/ig, 'i');
    st = st.replace(/[\u00D2-\u00D6]/ig, 'o');
    st = st.replace(/[\u00D9-\u00DC]/ig, 'u');
    st = st.replace(/[\u00D1]/ig, 'n');
    st = st.trim().replace(/ /g, '-');
    st = st.replace(/[^\w\s-]/g, '');
    return st;
  }

  /**
   * UI EVENTS
   * - triggerRemove
   * - triggerSelected
   * - triggerInput
   * - triggerChange
  */

  triggerRemove(value) {
    const selectedOptions = uniq(without(this.state.selected, value));
    this.triggerChange(selectedOptions);
  }

  triggerSelected(value) {
    let newVal = value;
    if (typeof value === 'string') {
      newVal = { id: this.getSlug(value), name: this.getSlug(value) };
    }

    const selectedOptions = uniq(this.state.selected.concat([newVal]));
    this.setState({
      selectedToken: null
    });

    this.triggerChange(selectedOptions);
  }

  triggerInput() {
    return this;
  }

  triggerChange(selected) {
    this.setState({ selected, value: selected.map(s => s.id) }, () => {
      // Trigger validation
      this.triggerValidate();
      // Publish the new value to the form
      if (this.props.onChange) this.props.onChange(this.state.value);
    });
  }

  render() {
    const { options, properties } = this.props;
    const { selected } = this.state;

    return (
      <TokenInput
        {...properties}
        menuContent={options || []}
        id={`select-${properties.name}`}
        selected={selected}
        onChange={this.triggerChange}
        onSelect={this.triggerSelected}
        onRemove={this.triggerRemove}
        onInput={this.triggerInput}
      />
    );
  }
}

Token.propTypes = {
  properties: React.PropTypes.object.isRequired,
  options: React.PropTypes.array,
  hint: React.PropTypes.string,
  validations: React.PropTypes.array,
  onChange: React.PropTypes.func
};

export default Token;
