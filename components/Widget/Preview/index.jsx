import React from 'react';

import './style.scss';

class WidgetPreview extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      columns: [],
      type: '',
      graphConfig: {}
    };
  }

  render() {
    return (
      <div className="c-widgets-preview">

      </div>
    );
  }
}

WidgetPreview.propTypes = {
  wizard: React.PropTypes.object.isRequired
};

export default WidgetPreview;
