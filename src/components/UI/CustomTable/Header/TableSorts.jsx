import React from 'react';
import Icon from '../../Icon';

export default class TableFilters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: 1
    };
  }

  render() {
    return (
      <div>
        <button onClick={() => this.props.onSort && this.props.onSort({ field: this.props.field, value: 1 })}>
          <Icon name="icon-arrow-up" className="-tiny" />
        </button>
        <button onClick={() => this.props.onSort && this.props.onSort({ field: this.props.field, value: -1 })}>
          <Icon name="icon-arrow-down" className="-tiny" />
        </button>
      </div>
    );
  }
}

TableFilters.propTypes = {
  field: React.PropTypes.string.isRequired,
  onSort: React.PropTypes.func
};

TableFilters.defaultProps = {
  onChange: null,
  selected: null
};
