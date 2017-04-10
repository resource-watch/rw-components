import React from 'react';

import Field from '../../form/Field';
import Select from '../../form/SelectInput';
import { get } from '../../../utils/request';

import { FORM_ELEMENTS } from './constants';

class VocabularySelector extends React.Component {
  constructor(props) {
    super(props);


    const { vocabulary, allVocabularies } = props;

    this.state = {
      vocabularies: allVocabularies || [],
      disabled: false,
      selected: null,
      form: {
        application: props.application,
        authorization: props.authorization,
        language: props.language
      }
    };

    // BINDINGS
    this.triggerChange = this.triggerChange.bind(this);
    this.loadVocabularies = this.loadVocabularies.bind(this);
  }

  componentWillMount() {
    const { vocabulary, allVocabularies } = this.props;

    if (!allVocabularies) {
      this.loadVocabularies();
    }
    if (vocabulary.name !== '') {
      this.setState({
        disabled: true,
        selectedVal: { label: vocabulary.name, value: vocabulary }
      });
    }
  }

  componentWillReceiveProps(props) {
    const selectedVal = { label: props.vocabulary.name, value: props.vocabulary };
    this.setState({
      vocabularies: [props.vocabulary],
      disabled: true,
      selected: selectedVal,
      form: {
        application: props.application,
        authorization: props.authorization,
        language: props.language
      }
    });
  }

  loadVocabularies() {
    get(
      {
        url: 'https://api.resourcewatch.org/v1/vocabulary',
        headers: [{ key: 'Content-Type', value: 'application/json' }],
        onSuccess: (response) => {
          this.setState({
            vocabularies: response.data.map(elem => elem.attributes),
            // Stop the loading
            loading: false
          });
        },
        onError: () => {
          console.info('Error');
        }
      }
    );
  }

  /**
  * UI EVENTS
  * triggerChange
  */
  triggerChange(value) {
    const newSelected = value ? { label: value.name, value } : null;
    this.setState({
      selected: newSelected,
      disabled: this.props.disableOnSelect
    });
    this.props.onChange(value);
  }

  render() {
    const { selected, disabled } = this.state;
    return (
      <Field
        ref={(c) => { if (c) FORM_ELEMENTS.children.tags = c; }}
        onChange={value => this.triggerChange(value)}
        options={this.state.vocabularies.map(
          vocabulary => ({ label: vocabulary.name, value: vocabulary })
        )}
        validations={['required']}

        properties={{
          name: 'vocabulary',
          label: 'Vocabulary',
          required: true,
          value: selected,
          default: selected,
          disabled
        }}
      >
        {Select}
      </Field>
    );
  }
}

VocabularySelector.propTypes = {
  onChange: React.PropTypes.func,
  application: React.PropTypes.string,
  authorization: React.PropTypes.string,
  language: React.PropTypes.string,
  disableOnSelect: React.PropTypes.boolean,
  vocabulary: React.PropTypes.object,
  allVocabularies: React.PropTypes.array
};

export default VocabularySelector;
