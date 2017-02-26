import React from 'react';
import './style.scss';

import Step from './step';
import Field from '../../../Form/Field';
import Input from '../../../Form/Input';
import Textarea from '../../../Form/Textarea';
import Code from '../../../Form/Code';

class Step1 extends Step {
  constructor(props) {
    super(props);

    this.state = {
      dataset: props.dataset,
      form: props.form
    };
  }

  render() {
    return (
      <fieldset className="c-field-container">
        {!this.state.form.authorization &&
          <Field
            ref={(c) => { if (c) this.children.push(c); }}
            onChange={value => this.props.onChange({ authorization: value })}
            validations={['required']}
            properties={{
              name: 'authorization',
              label: 'Authorization token',
              type: 'text',
              required: true,
              default: this.state.form.authorization || ''
            }}
          >
            {Input}
          </Field>
        }

        <Field
          ref={(c) => { if (c) this.children.push(c); }}
          onChange={value => this.props.onChange({ name: value })}
          validations={['required']}
          properties={{
            name: 'name',
            label: 'Title',
            type: 'text',
            required: true,
            default: this.state.form.name
          }}
        >
          {Input}
        </Field>

        <Field
          ref={(c) => { if (c) this.children.push(c); }}
          onChange={value => this.props.onChange({ provider: value })}
          validations={['required']}
          properties={{
            name: 'provider',
            label: 'Provider',
            type: 'text',
            required: true,
            default: this.state.form.provider
          }}
        >
          {Input}
        </Field>

        <Field
          ref={(c) => { if (c) this.children.push(c); }}
          onChange={value => this.props.onChange({ description: value })}
          properties={{
            name: 'description',
            label: 'Description',
            type: 'textarea',
            default: this.state.form.description
          }}
        >
          {Textarea}
        </Field>

        <Field
          ref={(c) => { if (c) this.children.push(c); }}
          onChange={value => this.props.onChange({ layerConfig: value })}
          properties={{
            name: 'layerConfig',
            label: 'Layer config',
            type: 'textarea',
            default: this.state.form.layerConfig
          }}
        >
          {Code}
        </Field>

        <Field
          ref={(c) => { if (c) this.children.push(c); }}
          onChange={value => this.props.onChange({ legendConfig: value })}
          properties={{
            name: 'legendConfig',
            label: 'Legend config',
            type: 'textarea',
            default: this.state.form.legendConfig
          }}
        >
          {Code}
        </Field>


      </fieldset>
    );
  }
}

Step1.propTypes = {
  dataset: React.PropTypes.string,
  form: React.PropTypes.object,
  onChange: React.PropTypes.func
};

export default Step1;
