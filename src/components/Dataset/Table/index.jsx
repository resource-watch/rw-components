import React from 'react';
import sortBy from 'lodash/sortBy';
import Spinner from '../../UI/Spinner';
import CustomTable from '../../UI/CustomTable/CustomTable';
import DeleteAction from './Actions/DeleteAction';
import MetadataAction from './Actions/MetadataAction';
import StatusTD from './TD/StatusTD';

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
    const url = `https://api.resourcewatch.org/v1/dataset?application=${application.join(',')}&includes=widget,layer,metadata&page[size]=${Date.now() / 100000}`;

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
          columns={[
            { label: 'name', value: 'name' },
            { label: 'status', value: 'status', td: StatusTD },
            { label: 'provider', value: 'provider' }
          ]}
          actions={{
            show: true,
            list: [
              { name: 'Edit', path: 'datasets/:id/edit', show: true },
              { name: 'Remove', path: 'datasets/:id/remove', component: DeleteAction, componentProps: { authorization: this.props.authorization } },
              { name: 'Metadata', path: 'datasets/:id/metadata', component: MetadataAction }
            ]
          }}
          data={this.state.datasets}
          pageSize={20}
          pagination={{
            enabled: true,
            pageSize: 20,
            page: 0
          }}
          onToggleSelectedRow={(ids) => { console.info(ids); }}
          onRowDelete={(id) => { console.info(id); }}
        />
      </div>
    );
  }
}

DatasetTable.defaultProps = {
  application: ['rw'],
  columns: [
    { label: 'name', value: 'name' },
    { label: 'provider', value: 'provider' }
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
  authorization: React.PropTypes.string
};

export default DatasetTable;
