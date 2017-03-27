import React from 'react';
// import TetherComponent from 'react-tether';
import Icon from '../../Icon';

export default class TableFilters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // closed: true,
      sort: 1
    };

    // // Bindings
    // this.onToggle = this.onToggle.bind(this);
    // this.onScreenClick = this.onScreenClick.bind(this);
  }

  // componentWillUnmount() {
  //   window.removeEventListener('click', this.onScreenClick);
  // }

  /**
   * UI EVENTS
   * - onToggle
   * - onScreenClick
  */
  // onToggle() {
  //   const { closed } = this.state;

  //   // requestAnimationFrame
  //   //   - Goal: Prevent double trigger at first atempt
  //   //   - Issue: When you add the listener the click event is not finished yet so it will trigger onScrennClick
  //   //   - Stop propagation?: if I put e.stopPropagation clicking on another filter btn won't trigger the screenClick,
  //   //                        so we will have 2 dropdown filters at the same time
  //   requestAnimationFrame(() => window[closed ? 'addEventListener' : 'removeEventListener']('click', this.onScreenClick));
  //   this.setState({ closed: !closed });
  // }

  // onScreenClick(e) {
  //   const el = document.querySelector('.c-table-tooltip');
  //   const clickOutside = el && el.contains && !el.contains(e.target);

  //   if (clickOutside) {
  //     this.onToggle();
  //   }
  // }

  render() {
    return (
      <div>
        <button onClick={() => this.props.onSort && this.props.onSort({ field: this.props.field, value: 1 })}>
          <Icon name="icon-arrow-up" />
        </button>
        <button onClick={() => this.props.onSort && this.props.onSort({ field: this.props.field, value: -1 })}>
          <Icon name="icon-arrow-down" />
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
