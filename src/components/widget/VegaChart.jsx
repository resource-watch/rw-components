import React from 'react';
import vega from 'vega';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import theme from '../../utils/widgets/vega-theme';

class VegaChart extends React.Component {

  constructor(props) {
    super(props);

    // BINDINGS
    this.triggerResize = debounce(this.triggerResize.bind(this), 250);
  }

  componentDidMount() {
    this.mounted = true;
    this.renderChart();
    window.addEventListener('resize', this.triggerResize);
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps.data, this.props.data);
  }

  componentDidUpdate() {
    // We should check if the data has changed
    this.renderChart();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.triggerResize);
    this.mounted = false;
  }

  setSize() {
    if (this.chart) {
      this.width = this.chart.offsetWidth;
      this.height = this.chart.offsetHeight;
    }
  }

  parseVega() {
    const size = {
      width: this.width
      // height: this.height
    };

    const data = Object.assign({}, this.props.data, size);

    if (this.mounted && this.props.toggleLoading) this.props.toggleLoading(true);
    vega.parse.spec(data, theme, (err, chart) => {
      if (this.mounted && this.props.toggleLoading) this.props.toggleLoading(false);
      if (!err && this.mounted) {
        this.vis = chart({
          el: this.chart,
          renderer: 'svg'
        });
        this.vis.update();
      }
    });
  }

  triggerResize() {
    this.renderChart();
  }

  renderChart() {
    this.setSize();
    this.parseVega();
  }

  render() {
    return (
      <div className="c-chart">
        <div ref={(c) => { this.chart = c; }} className="chart" />
      </div>
    );
  }
}

VegaChart.propTypes = {
  // Define the chart data
  data: React.PropTypes.object,
  toggleLoading: React.PropTypes.func
};

export default VegaChart;
