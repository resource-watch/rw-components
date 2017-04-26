import React from 'react';
import { Autobind } from 'es-decorators';

import { STATE_DEFAULT } from './constants';

import Button from '../../ui/Button';
import VocabulariesTable from '../table/VocabulariesTable';
import { get, post } from '../../../utils/request';

class VocabulariesForm extends React.Component {

  constructor(props) {
    super(props);
    const newState = Object.assign({}, STATE_DEFAULT, {
      loading: true,
      form: Object.assign({}, STATE_DEFAULT.form, {
        application: props.application,
        authorization: props.authorization,
        language: props.language
      })
    });

    this.state = newState;
  }

  /**
   * UI EVENTS
   * - triggerNewVocabulary
   * - handleRemoveVocabulary
   * - handleEditVocabulary
  */
  @Autobind
  triggerNewVocabulary() {
    const { vocabularies } = this.state;
    if (!vocabularies.find(voc => voc.name === '')) {
      vocabularies.push({ name: '', tags: [] });
      this.setState({ vocabularies });
    }
  }
  // @Autobind
  // handleRemoveVocabulary(voc) {
  //
  // }
  // @Autobind
  // handleEditVocabulary(voc) {
  //
  // }

  render() {
    const { application, authorization } = this.props;
    return (
      <div>
        <h1 className="-p-primary">
          Vocabularies
        </h1>
        {!this.state.loading &&
          <Button
            onClick={this.triggerNewVocabulary}
            properties={{
              type: 'button',
              className: '-primary'
            }}
          >
            New Vocabulary
          </Button>
        }
        <VocabulariesTable
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
