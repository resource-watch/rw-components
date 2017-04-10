import React from 'react';

import { STATE_DEFAULT, FORM_ELEMENTS } from './constants';

import Title from '../../ui/Title';
import VocabularyItem from './VocabularyItem';
import Button from '../../ui/Button';
import { get, post } from '../../../utils/request';

class VocabulariesForm extends React.Component {

  constructor(props) {
    super(props);
    const newState = Object.assign({}, STATE_DEFAULT, {
      datasetID: props.dataset,
      datasetName: '',
      form: Object.assign({}, STATE_DEFAULT.form, {
        application: props.application,
        authorization: props.authorization,
        language: props.language
      })
    });

    this.state = newState;

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.createNewVocabulary = this.createNewVocabulary.bind(this);
    this.handleDissociateVocabulary = this.handleDissociateVocabulary.bind(this);
  }

  componentWillMount() {
    if (this.state.datasetID) {
      // Start the loading
      this.setState({ loading: true });

      get(
        {
          url: `https://api.resourcewatch.org/v1/dataset/${this.state.datasetID}?includes=vocabulary&cache=${Date.now()}`,
          headers: [{ key: 'Content-Type', value: 'application/json' }],
          onSuccess: (response) => {
            const attrs = response.data.attributes;
            this.setState({
              hasVocabularies: attrs.vocabulary.length !== 0,
              datasetName: attrs.name,
              vocabularies: attrs.vocabulary.map(elem => elem.attributes),
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
  }

  /**
   * UI EVENTS
   * - onSubmit
   * - onChange
  */
  onSubmit(event) {
    event.preventDefault();

    FORM_ELEMENTS.validate();

    if (FORM_ELEMENTS.isFormValid()) {
      // Set a timeout due to the setState function of react
      setTimeout(() => {
        if (!this.state.submitting) {
          // Start the submitting
          this.setState({ submitting: true });

          const bodyObj = {};
          this.state.vocabularies.forEach((elem) => {
            bodyObj[elem.attributes.name] = { tags: elem.attributes.tags };
          });
          const body = JSON.stringify(bodyObj);

          post(
            {
              url: `https://api.resourcewatch.org/v1/dataset/${this.state.datasetID}/vocabulary`,
              headers: [
                { key: 'Content-Type', value: 'application/json' },
                { key: 'Authorization', value: this.state.form.authorization }
              ],
              body,
              onSuccess: (response) => {
                this.setState({ submitting: false });
                const successMessage = 'Vocabularies have been updated correctly';
                console.info(response);
                console.info(successMessage);
                alert(successMessage);
              },
              onError: () => {
                console.info('Error');
              }
            }
          );
        }
      }, 0);
    }
  }

  onChange(vocabularyName, obj) {
    const vocabularies = this.state.vocabularies.slice(0);
    let vocabularyFound = false;
    const newVocabularies = vocabularies.map((elem) => {
      if (elem.id === vocabularyName) {
        vocabularyFound = true;
        return obj;
      } else {
        return elem;
      }
    });
    if (!vocabularyFound) {
      const emptyVocabulary = newVocabularies.find(val => val.id === '');
      emptyVocabulary.id = obj.id;
      emptyVocabulary.attributes = obj.attributes;
    }
    this.setState({ vocabularies: newVocabularies }, console.info('this.state', this.state));
  }

  createNewVocabulary() {
    const { vocabularies } = this.state;
    vocabularies.push({ id: '', attributes: { name: '', tags: [] } });
    this.setState({ vocabularies });
  }

  handleDissociateVocabulary(voc) {
    const { vocabularies } = this.state;
    const newVocabularies = vocabularies.filter(elem => elem.id !== voc.name);
    this.setState({ vocabularies: newVocabularies });
  }

  render() {
    const { vocabularies } = this.state;
    return (
      <div>
        <Title className="-huge -p-primary">
          {this.state.datasetName}
        </Title>
        <Title className="-p-primary">
          Vocabularies
        </Title>
        <Button
          onClick={this.createNewVocabulary}
          properties={{
            type: 'button',
            className: '-primary'
          }}
        >
          New Vocabulary
        </Button>
        <form className="c-form" onSubmit={this.onSubmit} noValidate>
          {this.state.loading && 'loading'}
          {!this.state.loading && vocabularies.length > 0 &&
            vocabularies.map((elem, i) =>
              <VocabularyItem
                key={i}
                vocabulary={elem}
                onChange={this.onChange}
                application={this.props.application}
                authorization={this.props.authorization}
                language={this.props.language}
                readOnly
                onDissociateVocabulary={this.handleDissociateVocabulary}
              />
            )
          }
          <ul className="c-field-buttons">
            <li>
              <Button
                properties={{
                  type: 'submit',
                  name: 'commit',
                  disabled: this.state.loading,
                  className: `-primary ${this.state.loading ? '-disabled' : ''}`
                }}
              >
                Submit
              </Button>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

VocabulariesForm.propTypes = {
  application: React.PropTypes.string,
  authorization: React.PropTypes.string,
  language: React.PropTypes.string,
  dataset: React.PropTypes.string.isRequired
};

export default VocabulariesForm;
