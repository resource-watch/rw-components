import React from 'react';

import Step from './step';
import Field from '../../../Form/Field';
import Input from '../../../Form/Input';
import Textarea from '../../../Form/Textarea';
import Code from '../../../Form/Code';
import Checkbox from '../../../Form/Checkbox';

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
          onChange={value => this.props.onChange({ queryUrl: value })}
          validations={['required']}
          properties={{
            name: 'queryUrl',
            label: 'Query url',
            type: 'text',
            required: true,
            default: this.state.form.queryUrl
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
          onChange={value => this.props.onChange({ authors: value })}
          properties={{
            name: 'authors',
            label: 'Authors',
            type: 'text',
            default: this.state.form.authors
          }}
        >
          {Input}
        </Field>

        <Field
          ref={(c) => { if (c) this.children.push(c); }}
          onChange={value => this.props.onChange({ source: value })}
          properties={{
            name: 'source',
            label: 'Source',
            type: 'text',
            default: this.state.form.source
          }}
        >
          {Input}
        </Field>

        <Field
          ref={(c) => { if (c) this.children.push(c); }}
          onChange={value => this.props.onChange({ sourceUrl: value })}
          validations={['url']}
          properties={{
            name: 'sourceUrl',
            label: 'Source url',
            type: 'text',
            default: this.state.form.sourceUrl
          }}
        >
          {Input}
        </Field>

        <Field
          ref={(c) => { if (c) this.children.push(c); }}
          onChange={value => this.props.onChange({ widgetConfig: value })}
          properties={{
            name: 'widgetConfig',
            label: 'Widget config',
            type: 'textarea',
            default: this.state.form.widgetConfig
          }}
        >
          {Code}
        </Field>

        <Field
          ref={(c) => { if (c) this.children.push(c); }}
          onChange={value => this.props.onChange({ default: value })}
          option={{ label: 'Default' }}
          properties={{
            name: 'default',
            label: 'Do you want to set this widget as the default one. (Only one default widget per dataset is allowed at a time)',
            default: [this.state.form.default]
          }}
        >
          {Checkbox}
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
