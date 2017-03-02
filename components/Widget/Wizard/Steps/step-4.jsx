import React from 'react';
import './style.scss';

import Step from './step';
import Title from '../../../UI/Title';
import DatasetFilter from '../../../Dataset/Filter';

class Step4 extends Step {

  constructor(props) {
    super(props);

    // BINDINGS
    this.triggerChangeColumns = this.triggerChangeColumns.bind(this);
    this.triggerChangeFilters = this.triggerChangeFilters.bind(this);
  }

  triggerChangeColumns(columns) {
    this.props.onChange({ columns });
  }

  triggerChangeFilters(obj) {
    this.props.onChange({ filters: obj.map(o => o.filters) });
  }

  render() {
    const { wizard } = this.props;
    return (
      <fieldset className="c-field-container">
        <Title className="-primary -big">
          Filter your dataset
        </Title>
        <DatasetFilter
          dataset={wizard.dataset}
          onChangeColumns={this.triggerChangeColumns}
          onChangeFilters={this.triggerChangeFilters}
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
