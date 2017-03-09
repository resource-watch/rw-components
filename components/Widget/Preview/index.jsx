import React from 'react';

import Jiminy from 'jiminy';
import { chartConfig } from './constants';

import Field from '../../Form/Field';
import Select from '../../Form/Select';
import Spinner from '../../UI/Spinner';
import DatasetService from '../../../services/DatasetService';

import './style.scss';

class WidgetPreview extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      graphsTypes: [],
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

    // BINDINGS
    this.triggerChangeSelected = this.triggerChangeSelected.bind(this);
  }

  componentWillMount() {
    this.datasetService.fetchFilteredData(this.props.wizard.query)
      .then((data) => {
        this.setState({
          loading: false,
          data
        }, () => {
          this.getGraphTypes();
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  }


  /**
   * HELPERS
   * - getGraphTypes
  */
  getGraphTypes() {
    /* Finally, you instantiate Jiminy with both the objects */
    const jiminy = new Jiminy(this.state.data, chartConfig);

    /* You can get recommendations: what graphsTypes you can build with the data: */
    const graphsTypes = jiminy.recommendation(this.state.selected.columns);
    console.log(graphsTypes);
    console.log(this.state.selected.columns);
    this.setState({
      graphsTypes
    });
    // /*
    //   Returns:
    //   [
    //     'bar',
    //     'pie'
    //   ]
    //  */
    //
    // /* You can ask for the possible graphsTypes which must use (only) some columns: */
    // jiminy.recommendation(['city']);
    // /*
    //   Returns:
    //   [
    //     'pie'
    //   ]
    //  */
    //
    // /* If you already know which graph you want, you can ask Jiminy to give you
    //  * the columns necessary to build it: */
    // jiminy.columns('bar'); /* Returns the choices for the first column */
    // /*
    //   Returns:
    //   [
    //     'city',
    //     'country',
    //     'population'
    //   ]
    //  */
    //
    // jiminy.columns('bar', 'country'); /* And for the second */
    // /*
    //   Returns:
    //   [
    //     'population'
    //   ]
    //  */
  }


  /**
   * UI EVENTS
   * - triggerChangeSelected
  */
  triggerChangeSelected(obj) {
    const selected = Object.assign({}, this.state.selected, obj);
    console.log(selected);
    this.setState({ selected }, () => {
      this.getGraphTypes();
    });
  }


  render() {
    const { columns } = this.props.wizard;

    const { loading, graphsTypes } = this.state;
    return (
      <div className="c-widgets-preview">

        <Spinner className="-light" isLoading={loading} />

        <fieldset className="c-field-container">
          <Field
            options={columns.map(column =>
              ({ label: column.columnName, value: column.columnName })
            )}
            properties={{
              name: 'column',
              label: 'Columns',
              multi: true,
              default: ''
            }}
            onChange={value => this.triggerChangeSelected({ columns: value })}
          >
            {Select}
          </Field>
          {!!graphsTypes.length &&
            <Field
              options={graphsTypes.map(graphType =>
                ({ label: graphType, value: graphType })
              )}
              properties={{
                name: 'type',
                label: 'Graph types',
                default: ''
              }}
              onChange={value => this.triggerChangeSelected({ type: value })}
            >
              {Select}
            </Field>
          }
        </fieldset>
      </div>
    );
  }
}

WidgetPreview.propTypes = {
  wizard: React.PropTypes.object.isRequired
};

export default WidgetPreview;
