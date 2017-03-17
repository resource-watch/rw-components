import React from 'react';
import sortBy from 'lodash/sortBy';
import Spinner from '../../UI/Spinner';
import Table from '../../UI/Table';

class DatasetTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      datasets: [],
      loading: true
    };
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
    const url = `https://api.resourcewatch.org/v1/dataset?application=${application.join(',')}&includes=widget,layer&page[size]=${Date.now() / 100000}`;

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

  render() {
    return (
      <div className="c-dataset-table">
        <Spinner className="-light" isLoading={this.state.loading} />
        <Table data={ this.state.datasets } columns={['name', 'provider']} />
      </div>
    );
  }
}

DatasetTable.defaultProps = {
  application: ['rw'],
  editable: true,
  editPath: '/datasets/:id/edit'
};

DatasetTable.propTypes = {
  application: React.PropTypes.array.isRequired,
  editable: React.PropTypes.bool,
  editPath: React.PropTypes.string
};

export default DatasetTable;
