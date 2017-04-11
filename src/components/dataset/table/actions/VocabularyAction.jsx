import React from 'react';

class VocabularyAction extends React.Component {

  render() {
    const { data, href } = this.props;
    return (
      <span>
        {
          (data.status === 'saved') &&
          <a
            href={href}
          >
          Vocabularies
          </a>
        }
      </span>
    );
  }
}

VocabularyAction.propTypes = {
  data: React.PropTypes.object,
  href: React.PropTypes.string
};

export default VocabularyAction;
