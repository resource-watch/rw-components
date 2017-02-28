import React from 'react';
import './style.scss';

import Step from './step';
import Title from '../../../UI/Title';

class Step3 extends Step {
  render() {
    const { wizard } = this.props;
    return (
      <fieldset className="c-field-container">
        <Title className="-primary -huge">
          Filter your data ({wizard.dataset})
        </Title>
      </fieldset>
    );
  }
}

Step3.propTypes = {
  wizard: React.PropTypes.object
};

export default Step3;
