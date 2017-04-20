import React from 'react';

import { FORM_ELEMENTS } from '../constants';

import Field from '../../../form/Field';
import Input from '../../../form/Input';
import Textarea from '../../../form/TextArea';
import Code from '../../../form/Code';
import Checkbox from '../../../form/Checkbox';

class Step1 extends React.Component {
  render() {
    return (
      <fieldset className="c-field-container">
        {!this.props.form.authorization &&
          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.authorization = c; }}
            onChange={value => this.props.onChange({ authorization: value })}
            validations={['required']}
            properties={{
              name: 'authorization',
              label: 'Authorization token',
              type: 'text',
              required: true,
              default: this.props.form.authorization || ''
            }}
          >
            {Input}
          </Field>
        }

        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.name = c; }}
          onChange={value => this.props.onChange({ name: value })}
          validations={['required']}
          properties={{
            name: 'name',
            label: 'Title',
            type: 'text',
            required: true,
            default: this.props.form.name
          }}
        >
          {Input}
        </Field>

        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.queryUrl = c; }}
          onChange={value => this.props.onChange({ queryUrl: value })}
          validations={['required']}
          properties={{
            name: 'queryUrl',
            label: 'Query url',
            type: 'text',
            required: true,
            default: this.props.form.queryUrl
          }}
        >
          {Input}
        </Field>

        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.description = c; }}
          onChange={value => this.props.onChange({ description: value })}
          properties={{
            name: 'description',
            label: 'Description',
            type: 'textarea',
            rows: '6',
            default: this.props.form.description
          }}
        >
          {Textarea}
        </Field>

        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.authors = c; }}
          onChange={value => this.props.onChange({ authors: value })}
          properties={{
            name: 'authors',
            label: 'Authors',
            type: 'text',
            default: this.props.form.authors
          }}
        >
          {Input}
        </Field>

        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.source = c; }}
          onChange={value => this.props.onChange({ source: value })}
          properties={{
            name: 'source',
            label: 'Source',
            type: 'text',
            default: this.props.form.source
          }}
        >
          {Input}
        </Field>

        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.sourceUrl = c; }}
          onChange={value => this.props.onChange({ sourceUrl: value })}
          validations={['url']}
          properties={{
            name: 'sourceUrl',
            label: 'Source url',
            type: 'text',
            default: this.props.form.sourceUrl
          }}
        >
          {Input}
        </Field>

        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.widgetConfig = c; }}
          onChange={value => this.props.onChange({ widgetConfig: value })}
          properties={{
            name: 'widgetConfig',
            label: 'Widget config',
            type: 'textarea',
            default: this.props.form.widgetConfig
          }}
        >
          {Code}
        </Field>

        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.default = c; }}
          onChange={value => this.props.onChange({ default: value.checked })}
          validations={['required']}
          properties={{
            name: 'default',
            label: 'Default',
            value: 'default',
            title: 'Do you want to set this widget as the default one. (Only one default widget per dataset is allowed at a time)',
            checked: this.props.form.default
          }}
        >
          {Checkbox}
        </Field>

      </fieldset>
    );
  }
}

Step1.propTypes = {
  form: React.PropTypes.object,
  onChange: React.PropTypes.func
};

export default Step1;
