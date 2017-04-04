import React from 'react';

import { APPLICATIONS, CONNECTOR_TYPES, CONNECTOR_TYPES_DICTIONARY } from '../constants';

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

    // BINDINGS
    this.onConnectorTypeChange = this.onConnectorTypeChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.info('nextProps', nextProps);
    this.setState({ form: nextProps.form });
  }

  onConnectorTypeChange(value) {
    const newObj = Object.assign({}, value, { provider: '' });
    this.props.onChange(newObj);
  }

  render() {
    const provider = CONNECTOR_TYPES_DICTIONARY[this.state.form.connectorType];
    console.info('provider', provider);
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

        {/* <Field
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
        </Field> */}

        <Field
          ref={(c) => { if (c) this.children.push(c); }}
          onChange={value => this.onConnectorTypeChange({ connectorType: value })}
          validations={['required']}
          blank
          options={CONNECTOR_TYPES}
          properties={{
            name: 'connectorType',
            label: 'Connector Type',
            default: this.state.form.connectorType,
            disabled: !!this.state.dataset,
            required: true
          }}
        >
          {Select}
        </Field>

        {provider &&
          <Field
            ref={(c) => { if (c) this.children.push(c); }}
            onChange={value => this.props.onChange({ provider: value })}
            validations={['required']}
            blank
            options={Object.keys(provider).map(
              (key) => {
                console.info('provider[key]', provider[key]);
                return {
                  label: provider[key].label,
                  value: provider[key].value
                };
              })}
            properties={{
              name: 'provider',
              label: 'Provider',
              default: this.state.form.provider,
              value: this.state.form.provider,
              disabled: !!this.state.dataset,
              required: true
            }}
          >
            {Select}
          </Field>
        }
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
