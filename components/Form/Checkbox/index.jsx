import React from 'react';

import FormElement from '../FormElement';

import './style.scss';

class CheckboxGroup extends FormElement {

  constructor(props) {
    super(props);

    this.state = {
      value: props.properties.default
    };
  }

  /**
   * UI EVENTS
   * - triggerChange
  */
  triggerChange(e) {
    const value = e.currentTarget.checked;
    // Set state
    this.setState({
      value
    }, () => {
      // Trigger validation
      this.triggerValidate();
      if (this.props.onChange) this.props.onChange(this.state.value);
    });
  }

  render() {
    const { properties, option } = this.props;
    const { value } = this.state;

    return (
      <div className={`c-checkbox-box ${this.props.className}`}>
        <div className="c-checkbox">
          <input
            {...properties}
            type="checkbox"
            name={name}
            id={`checkbox-${name}`}
            checked={value}
            onChange={this.triggerChange}
          />
          <label htmlFor={`checkbox-${name}`}>
            <span />
            {option.label}
          </label>
        </div>
      </div>
    );
  }
}

CheckboxGroup.propTypes = {
  properties: React.PropTypes.object.isRequired,
  className: React.PropTypes.string,
  onChange: React.PropTypes.func
};

export default CheckboxGroup;
