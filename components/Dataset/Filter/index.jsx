import React from 'react';
import findIndex from 'lodash/findIndex';

import DatasetService from '../../../services/DatasetService';
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
      filters: [{}]
    };

    // DatasetService
    this.datasetService = new DatasetService(props.dataset.id, {
      apiURL: 'https://api.resourcewatch.org'
    });

    // BINDINGS
    this.triggerChangeFilters = this.triggerChangeFilters.bind(this);
    this.triggerNewFilter = this.triggerNewFilter.bind(this);
    this.triggerDeleteFilters = this.triggerDeleteFilters.bind(this);
  }

  componentWillMount() {
    this.datasetService.getFilters()
      .then((data) => {
        this.setState({
          loading: false,
          columns: data
        });
      })
      .then((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  }

  /**
   * UI EVENTS
   * - triggerChangeFilters
   * - triggerNewFilter
   * - triggerDeleteFilters
  */
  triggerChangeFilters(obj, i) {
    const filters = this.state.filters.slice(0);
    filters[i] = obj;

    this.setState({ filters }, () => {
      console.info(this.state.filters);
    });
  }

  triggerNewFilter() {
    const filters = [].concat(this.state.filters);
    filters.push({});

    this.setState({ filters }, () => {
      console.info(this.state.filters);
    });
  }

  triggerDeleteFilters(index) {
    const filters = [].concat(this.state.filters);
    filters.splice(index, 1);

    this.setState({ filters }, () => {
      console.info(this.state.filters);
    });
  }

  /**
   * RENDER
  */
  render() {
    const { columns, filters, loading } = this.state;
    console.log(filters);
    return (
      <div className="c-datasets-filter">
        {loading &&
          <Spinner isLoading={loading} className="-light" />
        }
        <div className="list">
          {!!columns.length &&
            this.state.filters.map((filter, i) => {
              return (
                <DatasetFilterItem
                  key={i}
                  filterId={i}
                  columns={columns}
                  filters={filter.filters}
                  selected={filter.selected}
                  onChange={value => this.triggerChangeFilters(value, i)}
                  onDelete={() => this.triggerDeleteFilters(i)}
                />
              );
            })
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
        </div>
      </div>
    );
  }
}

DatasetFilter.propTypes = {
  dataset: React.PropTypes.object.isRequired
};

export default DatasetFilter;
