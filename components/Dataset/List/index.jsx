import React from 'react';
import sortBy from 'lodash/sortBy';

import Spinner from '../../UI/Spinner';
import DatasetCard from '../Card';

import './style.scss';

class DatasetList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      datasets: [],
      loading: true,
      selected: props.selected,
      valid: false
    };

    // BINDINGS
    this.triggerClick = this.triggerClick.bind(this);
  }

  componentWillMount() {
    this.getDatasets();
  }

  /**
   * HELPERS
   * - getDatasets
   * - validate
   * - isValid
  */
  getDatasets() {
    const { application } = this.props;
    const url = `https://api.resourcewatch.org/dataset?app=${application.join(',')}&includes=widget,layer&page[size]=${Date.now() / 100000}`;

    fetch(new Request(url))
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then((response) => {
        const datasets = sortBy(response.data.map(dataset =>
          Object.assign({}, dataset.attributes, {
            id: dataset.id
          })
        ), 'name');
        this.setState({ datasets, loading: false });
      })
      .catch(() => {
        this.setState({ message: 'Error loading datasets', loading: false });
      });
  }

  validate() {
    const valid = !!this.state.selected;
    this.setState({ valid });
  }

  isValid() {
    return this.state.valid;
  }


  /**
   * UI EVENTS
   * - triggerClick
  */
  triggerClick(selected) {
    this.setState({ selected }, () => {
      if (this.props.onChange) this.props.onChange(this.state.selected);
    });
  }

  render() {
    const { selected } = this.state;
    return (
      <div className="c-datasets-list">
        {this.state.loading &&
          <Spinner className="-light" isLoading={this.state.loading} />
        }
        {this.state.datasets.length &&
          <ul className="list">
            {this.state.datasets.map(dataset =>
              <li
                key={dataset.id}
                className="list-item"
              >
                <DatasetCard
                  dataset={dataset}
                  properties={{
                    'data-id': dataset.id,
                    className: (dataset.id === selected) ? '-selected' : ''
                  }}
                  onClick={this.triggerClick}
                />
              </li>
            )}
          </ul>
        }
      </div>
    );
  }
}

DatasetList.propTypes = {
  application: React.PropTypes.array.isRequired,
  selected: React.PropTypes.string,
  onChange: React.PropTypes.func
};

export default DatasetList;
