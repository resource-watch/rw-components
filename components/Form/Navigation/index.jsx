import React from 'react';

import Button from '../../UI/Button';

import './style.scss';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: props.step,
      stepLength: props.stepLength
    };

    this.onBack = this.onBack.bind(this);
  }

  /**
   * UI EVENTS
   * - onBack
  */
  onBack(e) {
    e.preventDefault();

    // Send the step to the form
    if (this.props.onBack) this.props.onBack(this.state.step - 1);
  }

  render() {
    const { step, stepLength, submitting } = this.props;
    return (
      <ul className="c-field-buttons">
        {step !== 1 &&
          <li>
            <Button
              properties={{
                type: 'button',
                name: 'commit',
                className: '-primary'
              }}
              onClick={this.onBack}
            >
              Back
            </Button>
          </li>
        }
        {step !== stepLength &&
          <li>
            <Button
              properties={{
                type: 'submit',
                name: 'commit',
                className: '-primary'
              }}
            >
              Next
            </Button>
          </li>
        }
        {step === stepLength &&
          <li>
            <Button
              properties={{
                type: 'button',
                name: 'commit',
                disabled: submitting,
                className: `-primary ${submitting ? '-disabled' : ''}`
              }}
            >
              Submit
            </Button>
          </li>
        }
      </ul>
    );
  }
}

Navigation.propTypes = {
  step: React.PropTypes.number,
  stepLength: React.PropTypes.number,
  submitting: React.PropTypes.bool,
  onBack: React.PropTypes.func
};

export default Navigation;
