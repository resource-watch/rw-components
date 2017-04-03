import React from 'react';

const classesDic = {
  status: {
    success: '-success',
    failed: '-failed',
    saved: '-saved',
    deleted: '-deleted',
    pending: '-pending'
  }
};

class StatusTD extends React.Component {

  render() {
    const value = this.props.value;
    const className = `status ${classesDic.status[value]}`;
    return (
      <td
        className={className}
        key={this.props.key}
      >
        {value}
      </td>
    );
  }
}

StatusTD.propTypes = {
  value: React.PropTypes.object,
  key: React.PropTypes.string
};

export default StatusTD;
