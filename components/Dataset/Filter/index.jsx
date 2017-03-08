import React from 'react';

import DatasetService from '../../../services/DatasetService';
import { getQueryByFilters } from '../../../utils/queryUtils';
import DatasetFilterItem from '../FilterItem';
import Spinner from '../../UI/Spinner';
import Button from '../../UI/Button';


import './style.scss';

class DatasetFilter extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      columns: [],
      filters: [{}], // We need to create an empty object to render the first one
      query: getQueryByFilters(props.dataset.tableName)
    };

    // DatasetService
    this.datasetService = new DatasetService(props.dataset.id, {
      apiURL: 'https://api.resourcewatch.org'
    });

    // BINDINGS
    this.triggerChangeFilters = this.triggerChangeFilters.bind(this);
    this.triggerNewFilter = this.triggerNewFilter.bind(this);
    this.triggerDeleteFilters = this.triggerDeleteFilters.bind(this);
    this.triggerFetchFilteredData = this.triggerFetchFilteredData.bind(this);
  }

  componentWillMount() {
    this.datasetService.getFilters()
      .then((data) => {
        this.setState({
          loading: false,
          columns: data
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
    const query = getQueryByFilters(this.props.dataset.tableName, filters);

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
    filters.push({});
    const query = getQueryByFilters(this.props.dataset.tableName, filters);

    this.setState({ filters, query }, () => {
      if (this.props.onChange) {
        this.props.onChange({
          query: this.state.query,
          filters: this.state.filters
        });
      }
    });
  }

  triggerDeleteFilters(index) {
    const filters = [].concat(this.state.filters);
    filters.splice(index, 1);
    const query = getQueryByFilters(this.props.dataset.tableName, filters);

    // This is a piece of shit, we need to improve it
    this.setState({ filters: [] }, () => {
      this.setState({ filters, query }, () => {
        if (this.props.onChange) {
          this.props.onChange({
            query: this.state.query,
            filters: this.state.filters
          });
        }
      });
    });
  }

  triggerFetchFilteredData(e) {
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
                columns={columns}
                filters={filter.filters}
                selected={filter.selected}
                onChange={value => this.triggerChangeFilters(value, i)}
                onDelete={() => this.triggerDeleteFilters(i)}
              />
            )
          }
        </div>
        <div className="actions">
          <Button
            properties={{
              type: 'button',
              className: '-primary'
            }}
            onClick={this.triggerNewFilter}
          >
            Add new
          </Button>
          <Button
            properties={{
              type: 'button',
              className: '-primary'
            }}
            onClick={this.triggerFetchFilteredData}
          >
            Preview
          </Button>
        </div>
        <div className="actions">
          <pre>{query}</pre>
        </div>
      </div>
    );
  }
}

DatasetFilter.propTypes = {
  dataset: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func,
  onChange: React.PropTypes.func,
  onChange: React.PropTypes.func
};

export default DatasetFilter;
