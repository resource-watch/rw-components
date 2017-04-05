import React from 'react';

import Title from '../../UI/Title';
import { STATE_DEFAULT } from './constants';

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
  }

  componentWillMount() {
    if (this.state.datasetID) {
      // Start the loading
      this.setState({ loading: true });

      const xmlhttp = new XMLHttpRequest();
      xmlhttp.open('GET', `https://api.resourcewatch.org/v1/dataset/${this.state.datasetID}/?cache=${Date.now()}`);
      xmlhttp.setRequestHeader('Content-Type', 'application/json');
      xmlhttp.setRequestHeader('Authorization', this.state.form.authorization);
      xmlhttp.send();

      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState === 4) {
          if (xmlhttp.status === 200 || xmlhttp.status === 201) {
            const response = JSON.parse(xmlhttp.responseText);
            this.setState({
              datasetName: response.data.attributes.name,
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

    // Validate the form
    this.step.validate();

    // Set a timeout due to the setState function of react
    // setTimeout(() => {
    //   const valid = this.step.isValid();
    //   if (valid) {
    //     if (this.state.step === this.state.stepLength && !this.state.submitting) {
    //       // Start the submitting
    //       this.setState({ submitting: true });
    //
    //       // Set the request
    //       // Send the request
    //       const xmlhttp = new XMLHttpRequest();
    //       const xmlhttpOptions = {
    //         type: (this.state.datasetID && this.state.metadata.status) ? 'PATCH' : 'POST',
    //         authorization: this.state.form.authorization,
    //         contentType: 'application/json',
    //         omit: ['authorization']
    //       };
    //
    //       xmlhttp.open(xmlhttpOptions.type, `https://api.resourcewatch.org/v1/dataset/${this.state.datasetID}/metadata`);
    //       xmlhttp.setRequestHeader('Content-Type', xmlhttpOptions.contentType);
    //       xmlhttp.setRequestHeader('Authorization', xmlhttpOptions.authorization);
    //       const body = JSON.stringify({
    //         language: this.state.form.language,
    //         application: this.state.form.application,
    //         // Remove unnecesary atributtes to prevent 'Unprocessable Entity error'
    //         ...omit(this.state.metadata, xmlhttpOptions.omit)
    //       });
    //       xmlhttp.send(body);
    //
    //       xmlhttp.onreadystatechange = () => {
    //         if (xmlhttp.readyState === 4) {
    //           // Stop the submitting
    //           this.setState({ submitting: false });
    //
    //           if (xmlhttp.status === 200 || xmlhttp.status === 201) {
    //             const response = JSON.parse(xmlhttp.responseText);
    //             const successMessage = `Metadata has been uploaded correctly`;
    //             console.info(response);
    //             console.info(successMessage);
    //             alert(successMessage);
    //
    //           } else {
    //             console.info('Error', xmlhttp);
    //           }
    //         }
    //       };
    //     } else {
    //       this.setState({
    //         step: this.state.step + 1
    //       }, () => console.info(this.state));
    //     }
    //   }
    // }, 0);
  }

  onChange(obj) {

  }

  render() {
    return (
      <div>
        <Title className="-huge -p-primary">
          {this.state.datasetName}
        </Title>
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
