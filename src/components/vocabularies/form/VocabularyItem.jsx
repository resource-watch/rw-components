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

  componentWillReceiveProps(props){
    this.setState({ vocabulary: props.vocabulary });
  }

  onTagsChange(vals) {
    this.props.onChange({ name: this.state.vocabulary.name, values: vals });
  }

  render() {
    return (
      <fieldset className="c-field-container c-vocabulary-item">
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.children.name = c; }}
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
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.children.tags = c; }}
          onChange={values => this.onTagsChange(values)}
          options={this.state.vocabulary.tags.map(
            (tag) => { return { label: tag, value: tag }; }
          )}
          validations={['required']}
          selected={this.state.vocabulary.tags}
          properties={{
            name: 'tags',
            label: 'tags',
            creatable: true,
            multi: true,
            required: true,
            default: this.state.vocabulary.tags.map(
              (tag) => { return { label: tag, value: tag }; }
            )
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
