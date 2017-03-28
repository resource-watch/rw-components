import React from 'react';
import sortBy from 'lodash/sortBy';
import Spinner from '../../UI/Spinner';
import CustomTable from '../../UI/CustomTable/CustomTable';

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
        <CustomTable
          columns={this.props.columns}
          data={this.state.datasets}
          pageSize={20}
          actions={this.props.actions}
          pagination={{
            enabled: true,
            pageSize: 20,
            page: 0
          }}
          onToggleSelectedRow={(ids) => {
            // this.props.setSelectedPoints(ids);
          }}
          onRowDelete={(id) => {
            this.props.onPointRemove(id);
          }}
        />
      </div>
    );
  }
}

DatasetTable.defaultProps = {
  application: ['rw'],
  columns: [
    {label: 'name', value: 'name'}, 
    {label: 'provider', value: 'provider'}
  ],
  actions: {
    show: true,
    list: [
      { name: 'Edit', path: 'datasets/:id/edit', show: true },
      { name: 'Remove', path: 'datasets/:id/remove', show: true }
    ]
  }
};

DatasetTable.propTypes = {
  application: React.PropTypes.array.isRequired,
  columns: React.PropTypes.array,
  actions: React.PropTypes.object
};

export default DatasetTable;
