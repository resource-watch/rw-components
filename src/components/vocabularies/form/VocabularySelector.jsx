import React from 'react';

import Field from '../../form/Field';
import Select from '../../form/SelectInput';
import { get } from '../../../utils/request';

import { FORM_ELEMENTS } from './constants';

class VocabularySelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vocabularies: [],
      form: {
        application: props.application,
        authorization: props.authorization,
        language: props.language
      }
    };

    // BINDINGS
    this.triggerChange = this.triggerChange.bind(this);
  }

  componentWillMount() {
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

  triggerChange(value) {
    const newSelected = value ? { label: value.name, value: value.name } : null;
    this.setState({ selected: newSelected });
    this.props.onChange(value);
  }

  render() {
    const { selected } = this.state;
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
          default: selected
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
  language: React.PropTypes.string
};

export default VocabularySelector;
