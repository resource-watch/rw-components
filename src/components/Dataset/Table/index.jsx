import React from 'react';
import sortBy from 'lodash/sortBy';
import Spinner from '../../UI/Spinner';
import CustomTable from '../../UI/CustomTable/CustomTable';

const individualActions = {
  show: true,
  actions: [
    { name: 'Edit', path: 'datasets/:id/edit', show: true },
    { name: 'Remove', path: 'datasets/:id/remove', show: true }
  ]
};

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
          individualActions={individualActions}
          actions={{
            showable: false,
            editable: false,
            removable: false
          }}
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
  editable: true,
  columns: [
    {label: 'name', value: 'name'}, 
    {label: 'provider', value: 'provider'}
  ]
};

DatasetTable.propTypes = {
  application: React.PropTypes.array.isRequired,
  editable: React.PropTypes.bool,
  editPath: React.PropTypes.string,
  removePath: React.PropTypes.string,
  columns: React.PropTypes.array
};

export default DatasetTable;
