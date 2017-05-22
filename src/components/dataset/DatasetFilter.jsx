import React from 'react';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import DatasetService from '../../services/DatasetService';
import getQueryByFilters from '../../utils/getQueryByFilters';
import DatasetFilterItem from './DatasetFilterItem';
import Spinner from '../ui/Spinner';
import Button from '../ui/Button';

class DatasetFilter extends React.Component {

  static getQueryColumns(columns) {
    return columns.map(c => ({
      key: c.columnName,
      value: c.columnName
    }));
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      columns: props.wizard.columns || [],
      filters: props.wizard.filters || [{}], // We need to create an empty object to render the first one
      query: props.wizard.query || ''
    };

    // DatasetService
    this.datasetService = new DatasetService(props.dataset.id, {
      apiURL: 'https://api.resourcewatch.org/v1'
    });

    // BINDINGS
    this.triggerChangeFilters = this.triggerChangeFilters.bind(this);
    this.triggerNewFilter = this.triggerNewFilter.bind(this);
    this.triggerDeleteFilters = this.triggerDeleteFilters.bind(this);
    this.triggerFetchFilteredData = this.triggerFetchFilteredData.bind(this);
  }

  componentWillMount() {
    if (this.state.columns && this.state.columns.length) {
      this.setState({ loading: false });
    } else {
      this.datasetService.getFilters()
        .then((columns) => {
          const { filters } = this.state;

          this.setState({
            columns,
            loading: false,
            query: getQueryByFilters(this.props.dataset.id, filters, DatasetFilter.getQueryColumns(columns))
          }, () => {
            if (this.props.onChange) {
              this.props.onChange({
                query: this.state.query,
                columns: this.state.columns
              });
            }
          });
        })
        .catch((err) => {
          console.error(err);
          this.setState({ loading: false });
        });
    }
  }


  /**
   * HELPERS
   * - getColumns
  */
  getColumns(index) {
    const { columns, filters } = this.state;
    let parsedFilters = [].concat(filters);
    let parsedColumns = [].concat(columns);

    if (filters.length > 1 && index) {
      parsedFilters = parsedFilters
        .slice(null, index)
        .map(filter => filter.filters.columnName);
      parsedColumns = parsedColumns.filter((column) => {
        const isColumnFiltered = parsedFilters.indexOf(column.columnName) === -1;
        return isColumnFiltered;
      });
    }

    return parsedColumns;
  }

  validateFilters() {
    const { filters } = this.state;
    const lastFilter = filters[filters.length - 1];

    return lastFilter && lastFilter.filters && !isEmpty(lastFilter.filters);
  }


  /**
   * UI EVENTS
   * - triggerChangeFilters
   * - triggerNewFilter
   * - triggerDeleteFilters
   * - triggerFetchFilteredData
  */
  triggerChangeFilters(obj, i) {
    const filters = [].concat(this.state.filters);
    filters[i] = obj;
    const query = getQueryByFilters(this.props.dataset.id, filters, DatasetFilter.getQueryColumns(this.state.columns));

    this.setState({ filters, query }, () => {
      if (this.props.onChange) {
        this.props.onChange({
          query: this.state.query,
          filters: this.state.filters
        });
      }
    });
  }

  triggerNewFilter() {
    const filters = [].concat(this.state.filters);

    // Check if the last item of the array is filled
    if (this.validateFilters()) {
      filters.push({});
      const query = getQueryByFilters(this.props.dataset.id, filters, DatasetFilter.getQueryColumns(this.state.columns));

      this.setState({ filters, query }, () => {
        if (this.props.onChange) {
          this.props.onChange({
            query: this.state.query,
            filters: this.state.filters
          });
        }
      });
    }
  }

  triggerDeleteFilters(index) {
    const filters = [].concat(this.state.filters);
    filters.splice(index, 1);
    const query = getQueryByFilters(this.props.dataset.id, filters, DatasetFilter.getQueryColumns(this.state.columns));

    this.setState({ filters, query }, () => {
      if (this.props.onChange) {
        this.props.onChange({
          query: this.state.query,
          filters: this.state.filters
        });
      }
    });
  }

  triggerFetchFilteredData() {
    this.datasetService.fetchFilteredData(this.state.query)
      .then((data) => {
        console.info(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }


  /**
   * RENDER
  */
  render() {
    const { columns, filters, query, loading } = this.state;

    return (
      <div className="c-datasets-filter">
        {loading &&
          <Spinner isLoading={loading} className="-light" />
        }
        <div className="list">
          {!!columns.length &&
            filters.map((filter, i) =>
              <DatasetFilterItem
                key={i}
                index={i}
                columns={this.getColumns(i)}
                filters={filter.filters}
                selected={filter.selected}
                onChange={value => this.triggerChangeFilters(value, i)}
                onDelete={() => this.triggerDeleteFilters(i)}
              />
            )
          }
        </div>
        <ul className="c-field-buttons actions">
          <li>
            <Button
              properties={{
                type: 'button',
                className: classnames('-primary', {
                  '-disabled': !this.validateFilters()
                }),
                disabled: !this.validateFilters()
              }}
              onClick={this.triggerNewFilter}
            >
              Add new
            </Button>
          </li>
          {/* <li>
            <Button
              properties={{
                type: 'button',
                className: '-primary'
              }}
              onClick={this.triggerFetchFilteredData}
            >
              Preview
            </Button>
          </li> */}
        </ul>
        <div className="c-code">
          <pre><code className="language-sql">{query}</code></pre>
        </div>
      </div>
    );
  }
}

DatasetFilter.propTypes = {
  dataset: React.PropTypes.object.isRequired,
  wizard: React.PropTypes.object,
  onChange: React.PropTypes.func
};

export default DatasetFilter;
