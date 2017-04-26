import React from 'react';
import sortBy from 'lodash/sortBy';
import Spinner from '../../ui/Spinner';
import CustomTable from '../../ui/customtable/CustomTable';

class VocabulariesTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      vocabularies: [],
      loading: true
    };
  }

  componentDidMount() {
    this.getVocabularies();
  }

  /**
   * HELPERS
   * - getVocabularies
  */
  getVocabularies() {
    const url = 'https://api.resourcewatch.org/v1/vocabulary';

    fetch(new Request(url))
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then((response) => {
        const vocabularies = sortBy(response.data.map(vocabulary =>
          vocabulary.id
        ), 'id');
        this.setState({ vocabularies, loading: false });
      })
      .catch(() => {
        this.setState({ message: 'Error loading vocabularies', loading: false });
      });
  }

  render() {
    return (
      <div className="c-vocabularies-table">
        <Spinner className="-light" isLoading={this.state.loading} />
        <CustomTable
          columns={[
            { label: 'name', value: 'name' }
          ]}
          actions={{
            show: true,
            list: [
              // { name: 'Edit', path: '/datasets/:id/edit', show: true, component: EditAction },
              // { name: 'Remove', path: '/datasets/:id/remove', component: DeleteAction, componentProps: { authorization: this.props.authorization } }
            ]
          }}
          data={this.state.vocabularies}
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

VocabulariesTable.defaultProps = {
  application: ['rw'],
  columns: [],
  actions: {}
};

VocabulariesTable.propTypes = {
  application: React.PropTypes.array.isRequired,
  authorization: React.PropTypes.string
};

export default VocabulariesTable;
