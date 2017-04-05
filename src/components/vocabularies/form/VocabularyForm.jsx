import React from 'react';

import Field from '../../../Form/Field';

class VocabularyForm extends React.Component {
  constructor(props) {
    super(props);

    // BINDINGS
  }

  render() {
    return (
      <div>
        <Field
          ref={(c) => { if (c) this.children.push(c); }}
          onChange={value => this.props.onChange({ name: value })}
          validations={['required']}
          properties={{
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
            default: this.state.vocabulary.name
          }}
        >
          {Input}
        </Field>
      </div>
    );
  }
}

DatasetForm.propTypes = {
  application: React.PropTypes.array,
  authorization: React.PropTypes.string,
  dataset: React.PropTypes.string
};

export default DatasetForm;
