import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';

import Field from '../components/Form/Field';
import Input from '../components/Form/Input';
import Textarea from '../components/Form/Textarea';
import Select from '../components/Form/Select';
import Token from '../components/Form/Token';

storiesOf('Form', module)
  .add('Input', () => {
    return (
      <Field
        // onChange={value => this.props.onChange({ name: value })}
        onChange={value => console.info(value)}
        validations={['required']}
        properties={{
          name: 'name',
          label: 'Title',
          type: 'text',
          required: true,
          default: ''
        }}
      >
        {Input}
      </Field>
    );
  })
  .add('Textarea', () => {
    return (
      <Field
        // onChange={value => this.props.onChange({ name: value })}
        onChange={value => console.info(value)}
        validations={['required']}
        properties={{
          name: 'message',
          label: 'Message',
          required: true,
          default: ''
        }}
      >
        {Textarea}
      </Field>
    );
  })
  .add('Select', () => {
    return (
      <Field
        // onChange={value => this.props.onChange({ name: value })}
        onChange={value => console.info(value)}
        validations={['required']}
        hint="This is a hint. Should we add the possibility of adding HTML?"
        options={[
          { label: 'Cities', value: 'cities' },
          { label: 'Climate', value: 'climate' },
          { label: 'Energy', value: 'energy' },
          { label: 'Forests', value: 'forests' },
          { label: 'Food', value: 'food' },
          { label: 'Land classification', value: 'land_classification' },
          { label: 'Society', value: 'society' },
          { label: 'Supply chain', value: 'supply_chain' },
          { label: 'Water', value: 'water' }
        ]}
        properties={{
          name: 'topics',
          label: 'Topics',
          required: true,
          default: ''
        }}
      >
        {Select}
      </Field>
    );
  })
  .add('Token', () => {
    return (
      <Field
        // onChange={value => this.props.onChange({ name: value })}
        onChange={value => console.info(value)}
        validations={['required']}
        options={[
          { label: 'Cities', value: 'cities' },
          { label: 'Climate', value: 'climate' },
          { label: 'Energy', value: 'energy' },
          { label: 'Forests', value: 'forests' },
          { label: 'Food', value: 'food' },
          { label: 'Land classification', value: 'land_classification' },
          { label: 'Society', value: 'society' },
          { label: 'Supply chain', value: 'supply_chain' },
          { label: 'Water', value: 'water' }
        ]}
        properties={{
          name: 'tags',
          label: 'Tags',
          required: true,
          default: []
        }}
      >
        {Token}
      </Field>
    );
  })
