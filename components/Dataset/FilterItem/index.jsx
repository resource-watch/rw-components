import React from 'react';
import find from 'lodash/find';

import Field from '../../Form/Field';
import Select from '../../Form/Select';
import Input from '../../Form/Input';

import './style.scss';

const defaults = {
  selected: {
    columnName: '',
    columnType: '',
    values: null
  },
  filters: []
};

class DatasetFilterItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = defaults;

    this.triggerChangeSelected = this.triggerChangeSelected.bind(this);
    this.triggerChangeFilters = this.triggerChangeFilters.bind(this);
  }

  /**
   * UI EVENTS
   * - triggerChangeSelected
   * - triggerChangeFilters
  */
  triggerChangeSelected(value) {
    const selected = find(this.props.columns, { columnName: value }) || defaults;

    this.setState({ selected }, () => {
      if (this.props.onChange) this.props.onChange(this.state);
    });
  }

  triggerChangeFilters(obj) {
    const filters = Object.assign({}, this.state.filters, obj);

    this.setState({ filters }, () => {
      if (this.props.onChange) this.props.onChange(this.state);
    });
  }

  render() {
    const { selected } = this.state;
    const { columns } = this.props;

    return (
      <div className="c-datasets-filter-item">
        <div className="column">
          <Field
            options={columns.map(column => {
              return {
                label: column.columnName,
                value: column.columnName
              }
            })}
            properties={{
              name: 'column',
              label: 'Column',
              default: ''
            }}
            onChange={this.triggerChangeSelected}
          >
            {Select}
          </Field>
        </div>
        {selected.columnType === 'number' &&
          <div className="filters">
            <Field
              properties={{
                type: 'number',
                name: 'min',
                label: 'Min',
                min: selected.values.min,
                max: selected.values.max,
                default: ''
              }}
              onChange={value => this.triggerChangeFilters({ min: value })}
            >
              {Input}
            </Field>

            <Field
              properties={{
                type: 'number',
                name: 'max',
                label: 'Max',
                min: selected.values.min,
                max: selected.values.max,
                default: ''
              }}
              onChange={value => this.triggerChangeFilters({ max: value })}
            >
              {Input}
            </Field>
          </div>
        }

      </div>
    );
  }
}

DatasetFilterItem.propTypes = {
  columns: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func
};

export default DatasetFilterItem;
