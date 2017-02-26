import React from 'react';

import FormElement from '../FormElement';

import './style.scss';

class CheckboxGroup extends FormElement {

  constructor(props) {
    super(props);

    this.state = {
      value: props.properties.default || []
    };
  }

  /**
   * UI EVENTS
   * - triggerChange
  */
  triggerChange(e) {
    // - newSelected: Clone the current value array
    // - i: Get the indexOf the the current selection
    const newSelected = [].concat(this.state.value);
    const i = this.state.value.indexOf(e.currentTarget.value);

    // Toggle element from the array
    if (i === -1) {
      newSelected.push(e.currentTarget.value);
    } else {
      newSelected.splice(i, 1);
    }

    // Set state
    this.setState({
      value: newSelected
    }, () => {
      // Trigger validation
      this.triggerValidate();

      if (this.props.onChange) this.props.onChange(this.state.value);
    });
  }

  render() {
    const { properties, options } = this.props;
    const { value } = this.state;

    return (
      <div className={`c-checkbox-box ${this.props.className}`}>
        {options.map((item, i) => (
          <div key={i} className="c-checkbox">
            <input
              {...properties}
              type="checkbox"
              name={name}
              id={`checkbox-${name}-${item.value}`}
              value={item.value}
              checked={value.indexOf(item.value) !== -1}
              onChange={this.triggerChange}
            />
            <label htmlFor={`checkbox-${name}-${item.value}`}>
              <span />
              {item.label}
            </label>
          </div>
        ))}
      </div>
    );
  }
}

CheckboxGroup.propTypes = {
  options: React.PropTypes.array.isRequired,
  properties: React.PropTypes.object.isRequired,
  className: React.PropTypes.string,
  onChange: React.PropTypes.func
};

export default CheckboxGroup;
