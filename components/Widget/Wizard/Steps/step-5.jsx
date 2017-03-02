import React from 'react';
import './style.scss';

import Step from './step';
import Title from '../../../UI/Title';

class Step5 extends Step {
  render() {
    return (
      <fieldset className="c-field-container">
        <Title className="-primary -big">
          Preview
        </Title>

      </fieldset>
    );
  }
}

Step5.propTypes = {
  wizard: React.PropTypes.object
};

export default Step5;
