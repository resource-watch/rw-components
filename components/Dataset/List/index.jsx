import React from 'react';
import sortBy from 'lodash/sortBy';

import DatasetCard from '../Card';

import './style.scss';

class DatasetList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      datasets: [],
      selected: ''
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
        this.setState({ datasets });
      })
      .catch(() => {
        this.setState({ message: 'Error loading datasets' });
      });
  }


  /**
   * UI EVENTS
   * - triggerClick
  */
  triggerClick(id) {
    console.info(id);
  }

  render() {
    return (
      <div className="c-datasets-list">
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
                    'data-id': dataset.id
                  }}
                  onClick={this.triggerClick}
                />
              </li>
            )}
          </ul>
        }

        {!this.state.datasets.length &&
          <p>Loading ...</p>
        }
      </div>
    );
  }
}

DatasetList.propTypes = {
  application: React.PropTypes.array.isRequired
};

export default DatasetList;
