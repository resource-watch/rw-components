import React from 'react';

import './style.scss';

class DatasetCard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      datasets: [],
      selected: ''
    };

    this.triggerClick = this.triggerClick.bind(this);
  }

  /**
   * UI EVENTS
   * - triggerClick
  */

  triggerClick(e) {
    const datasetId = e.currentTarget.dataset.id;
    if (this.props.onClick) this.props.onClick(datasetId);
  }

  render() {
    const { dataset, properties } = this.props;
    return (
      <div
        {...properties}
        className={`c-datasets-card ${properties.className || ''}`}
        onClick={this.triggerClick}
      >
        <div className="header">
          <h3>{dataset.name}</h3>
        </div>
        {/* <div className="info">
          <p>{dataset.layer.length} layers</p>
          <p>{dataset.widget.length} widgets</p>
        </div> */}
      </div>
    );
  }
}

DatasetCard.propTypes = {
  dataset: React.PropTypes.object,
  properties: React.PropTypes.object,
  onClick: React.PropTypes.func
};

export default DatasetCard;
