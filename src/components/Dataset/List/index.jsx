import React from 'react';
import sortBy from 'lodash/sortBy';

import Spinner from '../../UI/Spinner';
import Table from '../../UI/Table';
import DatasetCard from '../Card';

class DatasetList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      datasets: [],
      loading: true,
      selected: props.selected || {},
      valid: false
    };

    // BINDINGS
    this.triggerClick = this.triggerClick.bind(this);
  }

  componentDidMount() {
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
    const { mode } = this.props;
    const { selected } = this.state;

    let datasets = null;

    if (mode === 'table') {
      datasets = (<Table data={ this.state.datasets } columns={['name', 'provider']} />);
    } else if (mode === 'cards') {
      datasets = this.state.datasets.map(dataset => {
        return (
          <DatasetCard
            key={dataset.id}
            dataset={dataset}
            properties={{
              'data-id': dataset.id,
              className: (dataset.id === selected.id) ? '-selected' : ''
            }}
            onClick={this.triggerClick}
          />
        );
      });
    } else {
      datasets = (
        <ul className="list">
          {this.state.datasets.map(dataset => {
            return (<li key={dataset.id} className="list-item">{dataset.name}</li>);
          })}
        </ul>
      );
    }

    return (
      <div className={`c-datasets-list -${mode}`}>
        <Spinner className="-light" isLoading={this.state.loading} />
        { datasets }
      </div>
    );
  }
}

DatasetList.defaultProps = {
  application: ['rw'],
  mode: 'table', // list, table or cards,
  selectable: true,
  editable: true,
  editPath: '/datasets/:id/edit'
};

DatasetList.propTypes = {
  application: React.PropTypes.array.isRequired,
  mode: React.PropTypes.string,
  selectable: React.PropTypes.bool,
  editable: React.PropTypes.bool,
  editPath: React.PropTypes.string,
  selected: React.PropTypes.object, // deprecated
  onChange: React.PropTypes.func // deprecated
};

export default DatasetList;
