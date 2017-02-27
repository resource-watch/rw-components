import React from 'react';
import sortBy from 'lodash/sortBy';

import WidgetCard from '../Card';

import './style.scss';

class WidgetList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      widgets: [],
      selected: ''
    };

    // BINDINGS
    this.triggerClick = this.triggerClick.bind(this);
  }

  componentWillMount() {
    this.getWidgets();
  }

  /**
   * HELPERS
   * - getWidgets
  */
  getWidgets() {
    const { dataset, application } = this.props;
    const url = `https://api.resourcewatch.org/dataset/${dataset}/widget?app=${application.join(',')}&includes=widget&page[size]=${Date.now()}`;

    fetch(new Request(url))
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then((response) => {
        const widgets = sortBy(response.data.map(widget =>
          Object.assign({}, widget.attributes, {
            id: widget.id
          })
        ), 'name');

        this.setState({ widgets });
      })
      .catch(() => {
        this.setState({ message: 'Error loading datasets' });
      });
  }


  /**
   * UI EVENTS
   * - triggerClick
  */
  triggerClick(id) {
    console.info(id);
  }

  render() {
    return (
      <div className="c-widgets-list">
        {this.state.widgets.length &&
          <ul className="list">
            {this.state.widgets.map(widget =>
              <li
                key={widget.id}
                className="list-item"
              >
                <WidgetCard
                  widget={widget}
                  properties={{
                    'data-id': widget.id
                  }}
                  onClick={this.triggerClick}
                />
              </li>
            )}
          </ul>
        }

        {!this.state.widgets.length &&
          <p>Loading ...</p>
        }
      </div>
    );
  }
}

WidgetList.propTypes = {
  application: React.PropTypes.array.isRequired,
  dataset: React.PropTypes.string.isRequired
};

export default WidgetList;
