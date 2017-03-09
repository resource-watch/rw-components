import React from 'react';

import Step from './step';
import Title from '../../../UI/Title';
import WidgetList from '../../../Widget/List';

class Step2 extends Step {
  render() {
    const { wizard } = this.props;
    return (
      <fieldset className="c-field-container">
        <Title className="-primary -big">
          Select a widget or create a new one
        </Title>
        <WidgetList
          ref={(c) => { if (c) this.children.push(c); }}
          dataset={wizard.dataset}
          selected={wizard.widget}
          application={['rw']}
          onChange={value => this.props.onChange({ widget: value })}
        />
      </fieldset>
    );
  }
}

Step2.propTypes = {
  wizard: React.PropTypes.object,
  onChange: React.PropTypes.func
};

export default Step2;
