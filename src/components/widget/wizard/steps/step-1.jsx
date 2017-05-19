import React from 'react';

import Step from '../../form/steps/Step1';
import Title from '../../../ui/Title';
import DatasetFilter from '../../../dataset/DatasetFilter';

class Step4 extends Step {

  constructor(props) {
    super(props);

    // BINDINGS
    this.triggerChange = this.triggerChange.bind(this);
  }

  triggerChange(obj) {
    this.props.onChange(obj);
  }

  render() {
    const { dataset, wizard } = this.props;
    return (
      <fieldset className="c-field-container">
        <Title className="-primary -big">
          Filter your dataset
        </Title>
        <DatasetFilter
          dataset={dataset}
          wizard={wizard}
          onChange={this.triggerChange}
        />
      </fieldset>
    );
  }
}

Step4.propTypes = {
  wizard: React.PropTypes.object,
  onChange: React.PropTypes.func
};

export default Step4;
