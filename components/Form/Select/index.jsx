import React from 'react';
import Select from 'react-select';
import FormElement from '../FormElement';

// Styles
import './style.scss';

class SelectInput extends FormElement {

  /**
   * UI EVENTS
   * - triggerChange
  */
  triggerChange(selected) {
    const value = (selected) ? selected.value : null;
    this.setState({ value }, () => {
      // Trigger validation
      this.triggerValidate();
      // Publish the new value to the form
      if (this.props.onChange) this.props.onChange(this.state.value);
    });
  }

  render() {
    const { options, properties } = this.props;

    return (
      <Select
        {...properties}
        options={options}
        id={`select-${properties.name}`}
        value={this.state.value}
        onChange={this.triggerChange}
      />
    );
  }
}

SelectInput.propTypes = {
  properties: React.PropTypes.object.isRequired,
  options: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func
};

export default SelectInput;