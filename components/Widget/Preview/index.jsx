import React from 'react';

// import Jiminy from 'jiminy';

import Field from '../../Form/Field';
import Select from '../../Form/Select';
import DatasetService from '../../../services/DatasetService';

import './style.scss';

class WidgetPreview extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: {
        columns: [],
        type: '',
        graphConfig: {}
      }
    };

    // DatasetService
    this.datasetService = new DatasetService(props.wizard.dataset.id, {
      apiURL: 'https://api.resourcewatch.org'
    });
  }

  componentWillMount() {
    this.datasetService.fetchFilteredData(this.props.wizard.query)
      .then((data) => {
        this.setState({
          loading: false,
          data
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  }


  render() {
    const { columns } = this.props.wizard;

    const { selected } = this.state;
    return (
      <div className="c-widgets-preview">
        <Field
          options={columns.map((column) => {
            return {
              label: column.columnName,
              value: column.columnName
            };
          })}
          properties={{
            name: 'column',
            label: 'Columns',
            multi: true,
            default: ''
          }}
          onChange={this.triggerChangeSelected}
        >
          {Select}
        </Field>

        {}
      </div>
    );
  }
}

WidgetPreview.propTypes = {
  wizard: React.PropTypes.object.isRequired
};

export default WidgetPreview;
