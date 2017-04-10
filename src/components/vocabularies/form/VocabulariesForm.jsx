import React from 'react';
import uniqBy from 'lodash/uniqBy';
import flatten from 'lodash/flatten';

import { STATE_DEFAULT, FORM_ELEMENTS } from './constants';

import Title from '../../ui/Title';
import VocabularyItem from './VocabularyItem';
import Button from '../../ui/Button';
import Spinner from '../../ui/Spinner';
import { get, post } from '../../../utils/request';

class VocabulariesForm extends React.Component {

  constructor(props) {
    super(props);
    const newState = Object.assign({}, STATE_DEFAULT, {
      datasetID: props.dataset,
      datasetName: '',
      loading: true,
      allVocabularies: [],
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
    this.loadAllVocabularies = this.loadAllVocabularies.bind(this);
    this.loadDatasetVocabularies = this.loadDatasetVocabularies.bind(this);

    this.loadAllVocabularies();
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
            bodyObj[elem.name] = { tags: elem.tags };
          });

          post(
            {
              type: 'PUT',
              url: `https://api.resourcewatch.org/v1/dataset/${this.state.datasetID}/vocabulary`,
              headers: [
                { key: 'Content-Type', value: 'application/json' },
                { key: 'Authorization', value: this.state.form.authorization }
              ],
              body: bodyObj,
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
    const newAllVocabularies =
      this.state.allVocabularies.filter(elem => elem.name !== obj.name);
    let vocabularyFound = false;
    const newVocabularies = vocabularies.map((elem) => {
      if (elem.name === vocabularyName) {
        vocabularyFound = true;
        return obj;
      } else {
        return elem;
      }
    });
    if (!vocabularyFound) {
      const emptyVocabulary = newVocabularies.find(val => val.name === '');
      emptyVocabulary.name = obj.name;
      emptyVocabulary.attributes = obj.attributes;
    }
    this.setState({
      vocabularies: newVocabularies,
      allVocabularies: newAllVocabularies
    }, console.info('this.state', this.state));
  }

  createNewVocabulary() {
    const { vocabularies } = this.state;
    if (!vocabularies.find(voc => voc.name === '')) {
      vocabularies.push({ name: '', tags: [] });
      this.setState({ vocabularies });
    }
  }

  handleDissociateVocabulary(voc) {
    const { vocabularies } = this.state;
    const newVocabularies = vocabularies.filter(elem => elem.name !== voc.name);
    const newAllVocabularies = this.state.vocabularies.slice(0).push(voc);
    this.setState({
      vocabularies: newVocabularies,
      allVocabularies: newAllVocabularies
    });
  }

  loadDatasetVocabularies() {
    if (this.state.datasetID) {
      // Start the loading
      this.setState({ loading: true });

      get(
        {
          url: `https://api.resourcewatch.org/v1/dataset/${this.state.datasetID}?includes=vocabulary&cache=${Date.now()}`,
          headers: [{ key: 'Content-Type', value: 'application/json' }],
          onSuccess: (response) => {
            const attrs = response.data.attributes;
            const vocabulary = attrs.vocabulary;
            const { allVocabularies } = this.state;
            const vocabularies = vocabulary.map(elem => elem.attributes);
            const allVocabulariesNew = allVocabularies.filter((elem) => {
              const vocabularyFound = !!vocabularies.find(tempVoc => tempVoc.name === elem.name);
              return !vocabularyFound;
            });
            this.setState({
              hasVocabularies: vocabulary.length !== 0,
              datasetName: attrs.name,
              vocabularies,
              allVocabularies: allVocabulariesNew,
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

  loadAllVocabularies() {
    get(
      {
        url: 'https://api.resourcewatch.org/v1/vocabulary',
        headers: [{ key: 'Content-Type', value: 'application/json' }],
        onSuccess: (response) => {
          const allVocabularies = response.data
            .map(elem => elem.attributes)
            .map(elem =>
              ({
                name: elem.name,
                tagSet: uniqBy(
                  flatten(elem.resources.map(res => res.tags)), e => e)
              })
            );
          this.setState({
            allVocabularies,
            allVocabulariesNotFiltered: allVocabularies.slice(0)
          }, this.loadDatasetVocabularies());
        },
        onError: () => {
          console.info('Error');
        }
      }
    );
  }

  render() {
    const { vocabularies, allVocabularies, allVocabulariesNotFiltered } = this.state;
    return (
      <div>
        <Title className="-huge -p-primary">
          {this.state.datasetName}
        </Title>
        <Title className="-p-primary">
          Vocabularies
        </Title>
        {!this.state.loading &&
          <Button
            onClick={this.createNewVocabulary}
            properties={{
              type: 'button',
              className: '-primary'
            }}
          >
            New Vocabulary
          </Button>
        }
        <Spinner
          isLoading={this.state.loading}
        />
        <form className="c-form" onSubmit={this.onSubmit} noValidate>
          {!this.state.loading && vocabularies.length > 0 &&
            vocabularies.map((elem, i) => {
              const tempVoc = allVocabulariesNotFiltered.find(val => val.name === elem.name);
              const elemWithTagSet = Object.assign(
                elem,
                { tagSet: tempVoc ? tempVoc.tagSet : [] }
              );
              return (<VocabularyItem
                key={i}
                vocabulary={elemWithTagSet}
                allVocabularies={allVocabularies}
                onChange={this.onChange}
                application={this.props.application}
                authorization={this.props.authorization}
                language={this.props.language}
                readOnly
                onDissociateVocabulary={this.handleDissociateVocabulary}
              />);
            })
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
