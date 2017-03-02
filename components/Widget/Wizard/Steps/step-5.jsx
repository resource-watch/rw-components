import React from 'react';
import './style.scss';

import Step from './step';
import Title from '../../../UI/Title';
import WidgetPreview from '../../Preview';

class Step5 extends Step {
  render() {
    return (
      <fieldset className="c-field-container">
        <Title className="-primary -big">
          Preview
        </Title>
        <WidgetPreview
          wizard={this.props.wizard}
        />
      </fieldset>
    );
  }
}

Step5.propTypes = {
  wizard: React.PropTypes.object
};

export default Step5;
