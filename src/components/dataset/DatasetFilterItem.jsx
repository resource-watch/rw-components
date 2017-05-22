import React from 'react';
import find from 'lodash/find';

import Field from '../form/Field';
import Select from '../form/SelectInput';
import Input from '../form/Input';
import Button from '../ui/Button';

const defaults = {
  selected: {
    columnName: '',
    columnType: '',
    properties: {}
  },
  filters: {}
};

export const FORM_ELEMENTS = {
  elements: {
  },
  validate(step) {
    const elements = this.elements[`step${step}`] || this.elements;
    const elementsArray = Object.keys(elements);
    if (elementsArray.length) {
      elementsArray.forEach((k) => {
        elements[k].validate();
      });
    }
  },
  isValid(step) {
    const elements = this.elements[`step${step}`] || this.elements;
    const valid = Object.keys(elements)
      .map(k => elements[k].isValid())
      .filter(v => v !== null)
      .every(element => element);

    return valid;
  }
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
        <div className="columnName">
          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.column = c; }}
            options={columns.map(column => ({
              label: column.columnName,
              value: column.columnName
            }))}
            properties={{
              name: 'column',
              label: 'Column',
              default: filters.columnName,
              value: selected.columnName
            }}
            onChange={this.triggerChangeSelected}
          >
            {Select}
          </Field>
        </div>
        {(selected.columnType === 'number' || selected.columnType === 'date') &&
          <div className="filters">
            <Field
              ref={(c) => { if (c) FORM_ELEMENTS.elements.min = c; }}
              validations={[{
                type: 'min',
                condition: selected.properties.min
              }, {
                type: 'max',
                condition: (filters.properties && filters.properties.max) ?
                  filters.properties.max :
                  selected.properties.max
              }]}
              properties={{
                type: selected.columnType,
                name: 'min',
                label: 'Min',
                min: selected.properties.min,
                max: selected.properties.max,
                default: (filters.properties) ? filters.properties.min : '',
                value: (filters.properties) ? filters.properties.min : ''
              }}
              onChange={value => this.triggerChangeFilters({
                columnName: selected.columnName,
                columnType: selected.columnType,
                properties: Object.assign({}, filters.properties, {
                  min: value
                })
              })}
            >
              {Input}
            </Field>

            <Field
              ref={(c) => { if (c) FORM_ELEMENTS.elements.max = c; }}
              validations={[{
                type: 'min',
                condition: (filters.properties && filters.properties.min) ?
                  filters.properties.min :
                  selected.properties.min
              }, {
                type: 'max',
                condition: selected.properties.max
              }]}
              properties={{
                type: 'number',
                name: 'max',
                label: 'Max',
                min: selected.properties.min,
                max: selected.properties.max,
                default: (filters.properties) ? filters.properties.max : '',
                value: (filters.properties) ? filters.properties.max : ''
              }}
              onChange={value => this.triggerChangeFilters({
                columnName: selected.columnName,
                columnType: selected.columnType,
                properties: Object.assign({}, filters.properties, {
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
              ref={(c) => { if (c) FORM_ELEMENTS.elements.values = c; }}
              options={selected.properties.values.map((value) => {
                return {
                  label: value,
                  value
                };
              })}
              properties={{
                name: 'values',
                label: 'Values',
                multi: true,
                default: (filters.properties) ? filters.properties.values : [],
                value: (filters.properties) ? filters.properties.values : []
              }}
              onChange={value => this.triggerChangeFilters({
                columnName: selected.columnName,
                columnType: selected.columnType,
                properties: {
                  values: value
                }
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
