import React from 'react';
import omit from 'lodash/omit';

import { STATE_DEFAULT } from './constants';

import Step1 from './steps/Step1';
import Navigation from '../../Form/Navigation';

class MetadataForm extends React.Component {
  constructor(props) {
    super(props);
    const newState = Object.assign({}, STATE_DEFAULT, {
      dataset: props.dataset,
      metadata: [],
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
    if (this.state.dataset) {
      // Start the loading
      this.setState({ loading: true });

      const xmlhttp = new XMLHttpRequest();
      xmlhttp.open('GET', `https://api.resourcewatch.org/v1/dataset/${this.state.dataset}/?includes=metadata&cache=${Date.now()}`);
      xmlhttp.setRequestHeader('Content-Type', 'application/json');
      xmlhttp.setRequestHeader('Authorization', this.state.form.authorization);
      xmlhttp.send();

      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState === 4) {
          if (xmlhttp.status === 200 || xmlhttp.status === 201) {
            const response = JSON.parse(xmlhttp.responseText);
            this.setState({
              metadata: response.data.attributes.metadata ?
                response.data.attributes.metadata[0].attributes : STATE_DEFAULT.metadata,
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
    setTimeout(() => {
      const valid = this.step.isValid();
      if (valid) {
        if (this.state.step === this.state.stepLength && !this.state.submitting) {
          // Start the submitting
          this.setState({ submitting: true });

          // Set the request
          // Send the request
          const xmlhttp = new XMLHttpRequest();
          const xmlhttpOptions = {
            type: (this.state.dataset && this.state.metadata) ? 'PATCH' : 'POST',
            authorization: this.state.form.authorization,
            contentType: 'application/json',
            omit: ['authorization']
          };

          xmlhttp.open(xmlhttpOptions.type, `https://api.resourcewatch.org/v1/dataset/${this.state.dataset}/metadata`);
          xmlhttp.setRequestHeader('Content-Type', xmlhttpOptions.contentType);
          xmlhttp.setRequestHeader('Authorization', xmlhttpOptions.authorization);
          xmlhttp.send(JSON.stringify({
            language: this.state.form.language,
            application: this.state.form.application,
            // Remove unnecesary atributtes to prevent 'Unprocessable Entity error'
            metadata: omit(this.state.metadata, xmlhttpOptions.omit)
          }));

          xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState === 4) {
              // Stop the submitting
              this.setState({ submitting: false });

              if (xmlhttp.status === 200 || xmlhttp.status === 201) {
                const response = JSON.parse(xmlhttp.responseText);
                const successMessage = `Metadata has been uploaded correctly`;
                console.info(response);
                console.info(successMessage);
                alert(successMessage);

                // Go back to first step and set the dataset
                // This will trigger the PATCH function
                this.setState({
                  step: 1,
                  layer: response.data.id
                });
              } else {
                console.info('Error');
              }
            }
          };
        } else {
          this.setState({
            step: this.state.step + 1
          }, () => console.info(this.state));
        }
      }
    }, 0);
  }

  onChange(obj) {
    const metadata = Object.assign({}, this.state.metadata, obj.metadata);
    this.setState({ metadata }, () => console.info(this.state.metadata));
  }

  onBack(step) {
    this.setState({ step });
  }

  render() {
    return (
      <div>
        <h3>ID: {this.state.dataset}</h3>
        <form className="c-form" onSubmit={this.onSubmit} noValidate>
          {this.state.loading && 'loading'}
          {(this.state.step === 1 && !this.state.loading) &&
            <Step1
              ref={(c) => { this.step = c; }}
              onChange={value => this.onChange(value)}
              metadata={this.state.metadata}
              dataset={this.state.dataset}
            />
          }

          {!this.state.loading &&
            <Navigation
              step={this.state.step}
              stepLength={this.state.stepLength}
              submitting={this.state.submitting}
              onBack={step => this.onBack(step)}
            />
          }
        </form>
      </div>
    );
  }
}

MetadataForm.propTypes = {
  application: React.PropTypes.array,
  authorization: React.PropTypes.string,
  language: React.PropTypes.string,
  dataset: React.PropTypes.string.isRequired
};

export default MetadataForm;
