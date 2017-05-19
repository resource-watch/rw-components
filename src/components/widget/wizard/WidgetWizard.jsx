import React from 'react';

import { STATE_DEFAULT, FORM_ELEMENTS } from './constants';
import { get, post } from '../../../utils/request';


import Step1 from './steps/step-1';
import Step2 from './steps/step-2';
import Navigation from '../../form/Navigation';

class WidgetWizard extends React.Component {
  constructor(props) {
    super(props);

    this.state = STATE_DEFAULT;

    this.onSubmit = this.onSubmit.bind(this);
    this.onWizardChange = this.onWizardChange.bind(this);
  }

  componentWillMount() {
    if (this.props.dataset) {
      // Start the loading
      this.setState({ loading: true });

      get({
        url: `https://api.resourcewatch.org/v1/dataset/${this.props.dataset}`,
        headers: [{
          key: 'Content-Type',
          value: 'application/json'
        }],
        onSuccess: (response) => {
          this.setState({
            dataset: {
              id: response.data.id,
              ...response.data.attributes
            },
            // Stop the loading
            loading: false
          });
        },
        onError: (error) => {
          this.setState({ loading: false });
          console.error(error);
        }
      });
    }
  }

  /**
   * UI EVENTS
   * - onSubmit
   * - onWizardChange
  */
  onWizardChange(obj) {
    const wizard = Object.assign({}, this.state.wizard, obj);
    this.setState({ wizard }, () => console.info(this.state.wizard));
  }

  onSubmit(e) {
    if (e) e.preventDefault();

    // Validate the form
    FORM_ELEMENTS.validate(this.state.step);

    // Set a timeout due to the setState function of react
    setTimeout(() => {
      const valid = FORM_ELEMENTS.isValid(this.state.step);
      if (valid) {
        if (this.state.step === this.state.stepLength && !this.state.submitting) {
          // Start the submitting
          this.setState({ submitting: true });

          post({
            type: (this.state.dataset && this.state.widget) ? 'PATCH' : 'POST',
            url: `https://api.resourcewatch.org/v1/dataset/${this.state.dataset}/widget/${this.state.widget || ''}`,
            body: {
              widget: this.state.form
            },
            headers: [{
              key: 'Content-Type',
              value: 'application/json'
            }, {
              key: 'Authorization',
              value: this.props.authorization
            }],
            onSuccess: (response) => {
              console.info(response);
            },
            onError: (error) => {
              this.setState({ loading: false });
              console.error(error);
            }
          });
        } else {
          this.setState({
            step: this.state.step + 1
          }, () => console.info(this.state));
        }
      }
    }, 0);
  }

  /**
   * HELPERS
   * - setStep
   * - setFormFromParams
  */
  setStep(step) {
    console.log(step);
    this.setState({ step });
  }

  setFormFromParams(params) {
    const form = Object.keys(this.state.form);
    const newForm = {};

    form.forEach((f) => {
      if (params[f] || this.state.form[f]) {
        newForm[f] = params[f] || this.state.form[f];
      }
    });

    return newForm;
  }

  /**
   * RENDER
  */
  render() {
    const { dataset, wizard, step, stepLength, submitting, loading } = this.state;

    return (
      <form className="c-form" onSubmit={this.onSubmit} noValidate>
        {step === 1 && !!dataset &&
          <Step1
            dataset={dataset}
            wizard={wizard}
            onChange={(value) => {
              this.onWizardChange(value);
            }}
          />
        }

        {step === 2 && !!dataset &&
          <Step2
            dataset={dataset}
            wizard={wizard}
            onChange={(value) => {
              this.onWizardChange(value);
            }}
          />
        }

        {!loading &&
          <Navigation
            step={step}
            stepLength={stepLength}
            submitting={submitting}
            onStepChange={s => this.setStep(s)}
          />
        }
      </form>
    );
  }
}

WidgetWizard.propTypes = {
  dataset: React.PropTypes.string.isRequired,
  application: React.PropTypes.array,
  authorization: React.PropTypes.string
};

export default WidgetWizard;
