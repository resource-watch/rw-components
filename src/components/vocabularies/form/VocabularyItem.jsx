import React from 'react';

import Field from '../../form/Field';
import Input from '../../form/Input';
import Button from '../../ui/Button';
import Select from '../../form/SelectInput';
import VocabularySelector from './VocabularySelector';

import { FORM_ELEMENTS } from './constants';

class VocabularyItem extends React.Component {
  constructor(props) {
    super(props);

    const { vocabulary } = props;
    this.state = {
      vocabulary,
      selectedTags: vocabulary.tags,
      tagSet: vocabulary.tagSet
    };

    // BINDINGS
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onVocabularyChange = this.onVocabularyChange.bind(this);
    this.triggerDissociateVocabulary = this.triggerDissociateVocabulary.bind(this);
  }

  componentWillReceiveProps(props) {
    const vocabulary = props.vocabulary;
    this.setState({
      vocabulary,
      selectedTags: vocabulary.tags || []
    });
  }

  onTagsChange(vals) {
    const vocabularyUpdated = Object.assign(this.state.vocabulary, { tags: vals });

    this.setState({
      vocabulary: vocabularyUpdated,
      selectedTags: vals
    }, this.props.onChange(this.state.vocabulary.name, this.state.vocabulary));
  }

  onVocabularyChange(value) {
    this.setState({
      vocabulary: value,
      tagSet: value.tagSet,
      selectedTags: []
    }, () => this.props.onChange(value.id, value));
  }

  /**
  * UI EVENTS
  * triggerDissociateVocabulary
  */
  triggerDissociateVocabulary() {
    this.props.onDissociateVocabulary(this.state.vocabulary);
  }

  render() {
    const { readOnly, allVocabularies } = this.props;
    const { tagSet, vocabulary, selectedTags } = this.state;

    return (
      <fieldset className="c-field-container c-vocabulary-item">
        {readOnly &&
          <div>
            <VocabularySelector
              onChange={this.onVocabularyChange}
              disableOnSelect
              vocabulary={vocabulary}
              allVocabularies={allVocabularies}
            />
            <Field
              ref={(c) => { if (c) FORM_ELEMENTS.children.tags = c; }}
              onChange={value => this.onTagsChange(value)}
              options={tagSet.map(val => ({ label: val, value: val }))}
              validations={['required']}
              selected={selectedTags.map(
                tag => ({ label: tag, value: tag })
              )}
              properties={{
                name: 'tags',
                label: 'tags',
                multi: true,
                required: true,
                default: selectedTags.map(
                  tag => ({ label: tag, value: tag })
                ),
                value: selectedTags.map(
                  tag => ({ label: tag, value: tag })
                )
              }}
            >
              {Select}
            </Field>
            <Button
              onClick={this.triggerDissociateVocabulary}
              properties={{
                type: 'button',
                name: 'dissociate',
                className: '-primary'
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
  allVocabularies: React.PropTypes.array,
  onChange: React.PropTypes.func,
  readOnly: React.PropTypes.bool,
  onDissociateVocabulary: React.PropTypes.func
};

export default VocabularyItem;
