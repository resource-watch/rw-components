import React from 'react';

class MetadataAction extends React.Component {

  render() {
    const { data, href } = this.props;
    return (
      <span>
        {
          (data.status === 'saved') &&
          <a
            href={href}
          >
          Metadata
          </a>
        }
      </span>
    );
  }
}

MetadataAction.propTypes = {
  data: React.PropTypes.object,
  href: React.PropTypes.string
};

export default MetadataAction;
