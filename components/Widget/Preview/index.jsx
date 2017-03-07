import React from 'react';

// import Jiminy from 'jiminy';

import Field from '../../Form/Field';
import Select from '../../Form/Select';

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
            multiple: true,
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
