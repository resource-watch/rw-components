import React from 'react';

import { STATE_DEFAULT, FORM_ELEMENTS } from './constants';

import Title from '../../UI/Title';
import VocabularyItem from './VocabularyItem';
import Button from '../../UI/Button';

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
  }

  componentWillMount() {
    if (this.state.datasetID) {
      // Start the loading
      this.setState({ loading: true });

      const xmlhttp = new XMLHttpRequest();
      xmlhttp.open('GET', `https://api.resourcewatch.org/v1/dataset/${this.state.datasetID}?includes=vocabulary&cache=${Date.now()}`);
      xmlhttp.setRequestHeader('Content-Type', 'application/json');
      xmlhttp.setRequestHeader('Authorization', this.state.form.authorization);
      xmlhttp.send();

      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState === 4) {
          if (xmlhttp.status === 200 || xmlhttp.status === 201) {
            const response = JSON.parse(xmlhttp.responseText);
            const attrs = response.data.attributes;
            let vocabularyArray = attrs.vocabulary;
            if (attrs.vocabulary.length === 0) {
              vocabularyArray = STATE_DEFAULT.vocabularies;
            }
            this.setState({
              hasVocabularies: attrs.vocabulary.length !== 0,
              datasetName: attrs.name,
              vocabularies: vocabularyArray,
              // Stop the loading
              loading: false
            });
          } else {
            console.info('Error');
          }
        }
      };
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
          // Set the request
          // Send the request
          const xmlhttp = new XMLHttpRequest();
          const xmlhttpOptions = {
            // type: (this.state.hasVocabularies) ? 'PATCH' : 'POST',
            type: 'POST',
            authorization: this.state.form.authorization,
            contentType: 'application/json',
            omit: ['authorization']
          };
          xmlhttp.open(xmlhttpOptions.type, `https://api.resourcewatch.org/v1/dataset/${this.state.datasetID}/vocabulary`);
          xmlhttp.setRequestHeader('Content-Type', xmlhttpOptions.contentType);
          xmlhttp.setRequestHeader('Authorization', xmlhttpOptions.authorization);
          const bodyObj = {};
          this.state.vocabularies.map(elem =>
            bodyObj[elem.name] = { tags: elem.tags }
          );
          const body = JSON.stringify(bodyObj);
          xmlhttp.send(body);
          xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState === 4) {
              // Stop the submitting
              this.setState({ submitting: false });
              if (xmlhttp.status === 200 || xmlhttp.status === 201) {
                const response = JSON.parse(xmlhttp.responseText);
                const successMessage = `Vocabularies have been uploaded correctly`;
                console.info(response);
                console.info(successMessage);
                alert(successMessage);
              } else {
                console.info('Error', xmlhttp);
              }
            }
          };
        }
      }, 0);
    }
  }

  onChange(obj) {
    const vocabularies = this.state.vocabularies.slice(0);
    const newVocabularies = vocabularies.map((elem) => {
      if (elem.attributes.name === obj.name) {
        return { attributes: { name: obj.name, tags: obj.values } };
      } else {
        return elem;
      }
    });
    this.setState({ vocabularies: newVocabularies }, console.info('this.state', this.state));
  }

  createNewVocabulary() {
    const { vocabularies } = this.state;
    vocabularies.push({ attributes: { name: 'name', tags: [] } });
    this.setState({ vocabularies: vocabularies });
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
            vocabularies.map(elem =>
              <VocabularyItem
                vocabulary={elem.attributes}
                onChange={this.onChange}
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
