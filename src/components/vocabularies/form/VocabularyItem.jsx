import React from 'react';
import uniqBy from 'lodash/uniqBy';
import flatten from 'lodash/flatten';

import Field from '../../form/Field';
import Input from '../../form/Input';
import Button from '../../ui/Button';
import Select from '../../form/SelectInput';
import VocabularySelector from './VocabularySelector';

import { FORM_ELEMENTS } from './constants';

class VocabularyItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vocabulary: props.vocabulary,
      selectedTags: [],
      tagSet: []
    };

    // BINDINGS
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onVocabularyChange = this.onVocabularyChange.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({ vocabulary: props.vocabulary });
  }

  onTagsChange(vals) {
    this.setState({ selectedTags: vals });
    this.props.onChange(this.state.vocabulary.name,
      { name: this.state.vocabulary.name, tags: vals });
  }

  onVocabularyChange(value) {
    const tagSet = uniqBy(
      flatten(value.attributes.resources.map(res => res.tags)), e => e);
    this.setState({
      vocabulary: value,
      tagSet
    });
    debugger;
  }

  triggerDissociateVocabulary() {
    this.props.onDissociateVocabulary(this.state.vocabulary);
  }

  render() {
    const { readOnly } = this.props;
    const { tagSet } = this.state;

    return (
      <fieldset className="c-field-container c-vocabulary-item">
        {!readOnly &&
          <div>
            <Field
              ref={(c) => { if (c) FORM_ELEMENTS.children.name = c; }}
              onChange={value =>
                this.props.onChange(this.state.vocabulary.name,
                  { name: value, tags: this.state.vocabulary.tags })}
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
              onChange={value => this.onTagsChange(value)}
              options={this.state.vocabulary.tags.map(
                (tag) => { return { label: tag, value: tag }; }
              )}
              validations={['required']}
              selected={this.state.vocabulary.tags.map(
                (tag) => { return { label: tag, value: tag }; }
              )}
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
          </div>
        }
        {readOnly &&
          <div>
            <VocabularySelector
              onChange={this.onVocabularyChange}
            />
            <Field
              ref={(c) => { if (c) FORM_ELEMENTS.children.tags = c; }}
              onChange={value => this.onTagsChange(value)}
              options={tagSet.map((val) => { return { label: val, value: val }; })}
              validations={['required']}
              selected={this.state.selectedTags.map(
                (tag) => { return { label: tag, value: tag }; }
              )}
              properties={{
                name: 'tags',
                label: 'tags',
                multi: true,
                required: true,
                default: this.state.selectedTags,
                value: this.state.selectedTags
              }}
            >
              {Select}
            </Field>
            <Button
              properties={{
                type: 'button',
                name: 'dissociate',
                className: '-primary',
                onClick: this.triggerDissociateVocabulary
              }}
            >
              Dissociate Vocabulary
            </Button>
          </div>
        }
      </fieldset>
    );
  }
}

VocabularyItem.propTypes = {
  vocabulary: React.PropTypes.object,
  onChange: React.PropTypes.func,
  readOnly: React.PropTypes.bool,
  onDissociateVocabulary: React.PropTypes.func
};

export default VocabularyItem;
