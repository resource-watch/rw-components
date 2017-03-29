import React from 'react';

import { APPLICATIONS, TOPICS, PROVIDERS } from '../constants';

import Step from './step';
import Field from '../../../Form/Field';
import Input from '../../../Form/Input';
import Select from '../../../Form/Select';
import Token from '../../../Form/Token';
import CheckboxGroup from '../../../Form/CheckboxGroup';

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
          onChange={value => this.props.onChange({ subtitle: value })}
          properties={{
            name: 'subtitle',
            label: 'Subtitle',
            type: 'text',
            default: this.state.form.subtitle
          }}
        >
          {Input}
        </Field>

        {!this.state.form.authorization &&
          <Field
            ref={(c) => { if (c) this.children.push(c); }}
            onChange={value => this.props.onChange({ application: value })}
            validations={['required']}
            options={APPLICATIONS}
            selected={this.state.form.application}
            properties={{
              name: 'application',
              label: 'Application',
              required: true
            }}
          >
            {CheckboxGroup}
          </Field>
        }

        <Field
          ref={(c) => { if (c) this.children.push(c); }}
          onChange={value => this.props.onChange({ topics: [value] })}
          validations={['required']}
          blank
          options={TOPICS}
          properties={{
            name: 'topics',
            label: 'Topics',
            default: (this.state.form.topics) ? this.state.form.topics[0] : '',
            required: true
          }}
        >
          {Select}
        </Field>

        <Field
          ref={(c) => { if (c) this.children.push(c); }}
          onChange={value => this.props.onChange({ tags: value })}
          validations={['required']}
          hint="This will cover different vocabularies that represent this dataset.
           Please write them comma separated: water,food"
          properties={{
            name: 'tags',
            label: 'Tags',
            type: 'text',
            default: this.state.form.tags || [],
            required: true
          }}
        >
          {Token}
        </Field>

        <Field
          ref={(c) => { if (c) this.children.push(c); }}
          onChange={value => this.props.onChange(this.providerDictionary[value])}
          validations={['required']}
          blank
          options={PROVIDERS}
          properties={{
            name: 'provider',
            label: 'Provider',
            default: this.state.form.provider,
            disabled: !!this.state.dataset,
            required: true
          }}
        >
          {Select}
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
