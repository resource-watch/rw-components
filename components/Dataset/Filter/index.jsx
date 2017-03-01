import React from 'react';

import DatasetService from '../../../services/DatasetService';
import DatasetFilterItem from '../FilterItem';
import Spinner from '../../UI/Spinner';

import './style.scss';

class DatasetFilter extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      columns: []
    };

    this.datasetService = new DatasetService(props.dataset.id, {
      apiURL: 'https://api.resourcewatch.org'
    });
  }

  componentWillMount() {
    this.datasetService.getFilters()
      .then((data) => {
        console.log(data);
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


  render() {
    const { columns, loading } = this.state;
    return (
      <div className="c-datasets-filter">
        {loading &&
          <Spinner isLoading={loading} />
        }
        <div className="list">
          {!!columns.length &&
            <DatasetFilterItem
              columns={columns}
            />
          }
        </div>
      </div>
    );
  }
}

DatasetFilter.propTypes = {
  dataset: React.PropTypes.object.isRequired
};

export default DatasetFilter;
