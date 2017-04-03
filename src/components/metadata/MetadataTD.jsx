import React from 'react';

class MetadataTD extends React.Component {

  render() {
    const { data, href } = this.props;
    return (
      <span>
        {
          (data.status === 'saved' || data.status === 'failed') &&
          <a
            href={href}
          >
            METADATA
          </a>
        }
      </span>
    );
  }
}

MetadataTD.propTypes = {
  data: React.PropTypes.object,
  href: React.PropTypes.string
};

export default MetadataTD;
