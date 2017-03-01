import React from 'react';
import './style.scss';

import Step from './step';
import Title from '../../../UI/Title';

class Step4 extends Step {
  render() {
    return (
      <fieldset className="c-field-container">
        <Title className="-primary -big">
          Filter your dataset
        </Title>
      </fieldset>
    );
  }
}

Step4.propTypes = {
  wizard: React.PropTypes.object
};

export default Step4;
