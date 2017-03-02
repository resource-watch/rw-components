import React from 'react';
import find from 'lodash/find';

import Field from '../../Form/Field';
import Select from '../../Form/Select';
import Input from '../../Form/Input';
import Button from '../../UI/Button';

import './style.scss';

const defaults = {
  selected: {
    columnName: '',
    columnType: '',
    values: null
  },
  filters: {}
};

class DatasetFilterItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected || defaults.selected,
      filters: props.filters || defaults.filters
    };

    // BINDINGS
    this.triggerChangeSelected = this.triggerChangeSelected.bind(this);
    this.triggerChangeFilters = this.triggerChangeFilters.bind(this);
    this.triggerDeleteFilters = this.triggerDeleteFilters.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selected: nextProps.selected || defaults.selected,
      filters: nextProps.filters || defaults.filters
    });
  }

  /**
   * UI EVENTS
   * - triggerChangeSelected
   * - triggerChangeFilters
   * - triggerDeleteFilters
  */
  triggerChangeSelected(value) {
    const selected = find(this.props.columns, { columnName: value });

    this.setState({
      selected: selected || defaults,
      filters: (selected) ? this.state.filters : {}
    }, () => {
      if (this.props.onChange) this.props.onChange(this.state);
    });
  }

  triggerChangeFilters(obj) {
    const filters = Object.assign({}, this.state.filters, obj);

    this.setState({ filters }, () => {
      if (this.props.onChange) this.props.onChange(this.state);
    });
  }

  triggerDeleteFilters() {
    if (this.props.onDelete) this.props.onDelete();
  }

  /**
   * RENDER
  */
  render() {
    const { selected, filters } = this.state;
    const { columns } = this.props;

    return (
      <div className="c-datasets-filter-item">
        <div className="column">
          <Field
            options={columns.map((column) => {
              return {
                label: column.columnName,
                value: column.columnName
              };
            })}
            properties={{
              name: 'column',
              label: 'Column',
              value: filters.columnName,
              default: ''
            }}
            onChange={this.triggerChangeSelected}
          >
            {Select}
          </Field>
        </div>
        {(selected.columnType === 'number' || selected.columnType === 'date') &&
          <div className="filters">
            <Field
              properties={{
                type: selected.columnType,
                name: 'min',
                label: 'Min',
                min: selected.values.min,
                max: selected.values.max,
                default: ''
              }}
              onChange={value => this.triggerChangeFilters({
                columnName: selected.columnName,
                columnType: selected.columnType,
                values: Object.assign({}, filters.values, {
                  min: value
                })
              })}
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
              onChange={value => this.triggerChangeFilters({
                columnName: selected.columnName,
                columnType: selected.columnType,
                values: Object.assign({}, filters.values, {
                  max: value
                })
              })}
            >
              {Input}
            </Field>
          </div>
        }

        {selected.columnType === 'string' &&
          <div className="filters">
            <Field
              options={selected.values.map((value) => {
                return {
                  label: value,
                  value
                };
              })}
              properties={{
                name: 'text',
                label: 'Text',
                default: ''
              }}
              onChange={value => this.triggerChangeFilters({
                columnName: selected.columnName,
                columnType: selected.columnType,
                values: [value]
              })}
            >
              {Select}
            </Field>

          </div>
        }

        {this.props.index !== 0 &&
          <Button
            properties={{
              type: 'button',
              className: '-primary'
            }}
            onClick={this.triggerDeleteFilters}
          >
            ×
          </Button>
        }

      </div>
    );
  }
}

DatasetFilterItem.propTypes = {
  index: React.PropTypes.number.isRequired,
  selected: React.PropTypes.object,
  filters: React.PropTypes.object,
  columns: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func,
  onDelete: React.PropTypes.func
};

export default DatasetFilterItem;
