import React from 'react';
import { Autobind } from 'es-decorators';
import sortBy from 'lodash/sortBy';

import { STATE_DEFAULT } from './constants';

import Button from '../../ui/Button';
import VocabulariesTable from '../table/VocabulariesTable';
import Spinner from '../../ui/Spinner';
import { get, post } from '../../../utils/request';

class VocabulariesForm extends React.Component {

  constructor(props) {
    super(props);
    const newState = Object.assign({}, STATE_DEFAULT, {
      loading: true,
      vocabularies: [],
      form: Object.assign({}, STATE_DEFAULT.form, {
        application: props.application,
        authorization: props.authorization,
        language: props.language
      })
    });

    this.state = newState;
  }

  componentDidMount() {
    this.getVocabularies();
  }

  /**
   * HELPERS
   * - getVocabularies
  */
  getVocabularies() {
    const url = 'https://api.resourcewatch.org/v1/vocabulary';

    get({
      url,
      headers: [],
      onSuccess: (response) => {
        const vocabularies = sortBy(response.data.map(vocabulary =>
          ({ name: vocabulary.id })
        ), 'id');
        this.setState({ vocabularies, loading: false });
      },
      onError: () => {
        this.setState({ message: 'Error loading vocabularies', loading: false });
      }
    });
  }

  /**
   * UI EVENTS
   * - triggerNewVocabulary
  */
  @Autobind
  triggerNewVocabulary() {
    
  }

  render() {
    const { application, authorization } = this.props;
    const { vocabularies } = this.state;
    return (
      <div>
        <h1 className="-p-primary">
          Vocabularies
        </h1>
        {!this.state.loading &&
          <div>
            <Button
              onClick={this.triggerNewVocabulary}
              properties={{
                type: 'button',
                className: '-primary -end'
              }}
            >
              New Vocabulary
            </Button>
          </div>
        }
        <Spinner className="-light" isLoading={this.state.loading} />
        <VocabulariesTable
          vocabularies={vocabularies}
          application={application}
          authorization={authorization}
        />
      </div>
    );
  }
}

VocabulariesForm.propTypes = {
  application: React.PropTypes.string,
  authorization: React.PropTypes.string,
  language: React.PropTypes.string
};

export default VocabulariesForm;
