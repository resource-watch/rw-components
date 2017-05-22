import React from 'react';

import getQueryByFilters from '../../../utils/getQueryByFilters';
import getParsedConfig from '../../../utils/getWidgetConfig';

import Field from '../../form/Field';
import Select from '../../form/SelectInput';
import Spinner from '../../ui/Spinner';
import VegaChart from '../VegaChart';
import DatasetService from '../../../services/DatasetService';

class WidgetPreview extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,

      // Jiminy
      jiminy: {},
      xOptions: [],
      yOptions: [],

      // Config
      parsedConfig: {},

      // Selected
      selected: {
        type: '',
        xAxis: '',
        yAxis: '',
        chartConfig: {}
      }
    };

    // DatasetService
    this.datasetService = new DatasetService(props.dataset.id, {
      apiURL: 'https://api.resourcewatch.org/v1'
    });

    // BINDINGS
    this.triggerChangeSelected = this.triggerChangeSelected.bind(this);
  }

  componentWillMount() {
    this.datasetService.fetchJiminy(this.props.wizard.query)
      .then((jiminy) => {
        this.setState({
          loading: false,
          jiminy
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  }


  /**
   * HELPERS
   * - getChartData
   * - getAxisOptions
  */

  getChartData() {
    const { selected } = this.state;
    const { wizard, dataset } = this.props;
    const columns = [];

    if (selected.xAxis) columns.push({ key: 'x', value: selected.xAxis, as: true });
    if (selected.yAxis) columns.push({ key: 'y', value: selected.yAxis, as: true });

    const sql = getQueryByFilters(dataset.tableName, wizard.filters, columns, [{ name: 'x', type: 'ASC' }]);

    const parsedConfig = {
      data: [{
        url: `https://api.resourcewatch.org/v1/query/${dataset.id}?sql=${sql}`,
        name: 'table',
        format: {
          type: 'json',
          property: 'data'
        }
      }]
    };

    this.setState({ parsedConfig });
  }

  getAxisOptions() {
    const { selected, jiminy } = this.state;

    let xOptions = [];
    let yOptions = [];

    if (selected.type) {
      xOptions = (selected.yAxis) ? jiminy.byType[selected.type].columns[selected.yAxis] : jiminy.byType[selected.type].general;
      yOptions = (selected.xAxis) ? jiminy.byType[selected.type].columns[selected.xAxis] : jiminy.byType[selected.type].general;
    }

    this.setState({ xOptions, yOptions }, () => {
      this.getChartData();
    });
  }

  /**
   * UI EVENTS
   * - triggerChangeSelected
  */
  triggerChangeSelected(obj) {
    // If type doesn't exist let's clear the selects
    const objParsed = (Object.prototype.hasOwnProperty.call(obj, 'type')) ?
      Object.assign({}, obj, { xAxis: null, yAxis: null }) :
      obj;
    const selected = Object.assign({}, this.state.selected, objParsed);
    this.setState({ selected }, () => {
      this.getAxisOptions();
    });
  }


  render() {
    const { selected, loading, jiminy, xOptions, yOptions, parsedConfig } = this.state;
    return (
      <div className="c-widgets-preview">

        <Spinner className="-light" isLoading={loading} />

        <fieldset className="c-field-container">
          {!!jiminy.general && !!jiminy.general.length &&
            <Field
              options={jiminy.general.map(graphType =>
                ({ label: graphType, value: graphType })
              )}
              properties={{
                name: 'type',
                label: 'Chart type',
                default: '',
                value: selected.type
              }}
              onChange={value => this.triggerChangeSelected({ type: value })}
            >
              {Select}
            </Field>
          }

          {!!xOptions.length &&
            <Field
              options={xOptions.map(xOption =>
                ({ label: xOption, value: xOption })
              )}
              properties={{
                name: 'xAxis',
                label: 'X axis',
                default: '',
                value: selected.xAxis
              }}
              onChange={value => this.triggerChangeSelected({ xAxis: value })}
            >
              {Select}
            </Field>
          }

          {!!yOptions.length &&
            <Field
              options={yOptions.map(yOption =>
                ({ label: yOption, value: yOption })
              )}
              properties={{
                name: 'yAxis',
                label: 'Y axis',
                default: '',
                value: selected.yAxis
              }}
              onChange={value => this.triggerChangeSelected({ yAxis: value })}
            >
              {Select}
            </Field>
          }

          {selected.type &&
            <VegaChart
              data={getParsedConfig(selected.type, parsedConfig)}
              toggleLoading={bool => console.info(bool)}
            />
          }
        </fieldset>
      </div>
    );
  }
}

WidgetPreview.propTypes = {
  wizard: React.PropTypes.object.isRequired,
  dataset: React.PropTypes.object.isRequired
};

export default WidgetPreview;
