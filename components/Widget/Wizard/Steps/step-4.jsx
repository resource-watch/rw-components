import React from 'react';
import './style.scss';

import Step from './step';
import Title from '../../../UI/Title';
import DatasetFilter from '../../../Dataset/Filter';

class Step4 extends Step {
  render() {
    const { wizard } = this.props;
    return (
      <fieldset className="c-field-container">
        <Title className="-primary -big">
          Filter your dataset
        </Title>
        <DatasetFilter
          dataset={wizard.dataset}
        />

      </fieldset>
    );
  }
}

Step4.propTypes = {
  wizard: React.PropTypes.object
};

export default Step4;
