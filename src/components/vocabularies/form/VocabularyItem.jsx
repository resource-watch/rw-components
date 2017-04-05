import React from 'react';

import Field from '../../Form/Field';
import Input from '../../Form/Input';
import Select from '../../Form/Select';

import { FORM_ELEMENTS } from './constants';

class VocabularyItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = { vocabulary: props.vocabulary };

    // BINDINGS
    this.onTagsChange = this.onTagsChange.bind(this);
  }

  onTagsChange(vals) {
    this.props.onChange({ id: this.state.vocabulary.id, values: vals });
  }

  render() {
    return (
      <fieldset className="c-field-container">
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.children.id = c; }}
          onChange={value => this.props.onChange({ id: value })}
          validations={['required']}
          properties={{
            name: 'id',
            label: 'ID',
            type: 'text',
            required: true,
            default: this.state.vocabulary.id
          }}
        >
          {Input}
        </Field>
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.children.tags = c; }}
          onChange={values => this.onTagsChange(values)}
          options={this.state.vocabulary.tags}
          validations={['required']}
          properties={{
            name: 'tags',
            label: 'tags',
            creatable: true,
            multi: true,
            required: true
          }}
        >
          {Select}
        </Field>
      </fieldset>
    );
  }
}

VocabularyItem.propTypes = {
  vocabulary: React.PropTypes.object,
  onChange: React.PropTypes.func
};

export default VocabularyItem;
