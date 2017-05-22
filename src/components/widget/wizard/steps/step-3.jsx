import React from 'react';

import Title from '../../../ui/Title';
import WidgetPreview from '../../preview/WidgetPreview';

class Step3 extends React.Component {

  constructor(props) {
    super(props);

    // BINDINGS
    this.triggerChange = this.triggerChange.bind(this);
  }

  triggerChange(obj) {
    this.props.onChange(obj);
  }

  render() {
    return (
      <fieldset className="c-field-container">
        <Title className="-primary -big">
          Preview
        </Title>
        <WidgetPreview
          dataset={this.props.dataset}
          wizard={this.props.wizard}
          onChange={this.triggerChange}
        />
      </fieldset>
    );
  }
}

Step3.propTypes = {
  dataset: React.PropTypes.object,
  wizard: React.PropTypes.object,
  onChange: React.PropTypes.func
};

export default Step3;
