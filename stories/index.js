import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';

// Dataset
import DatasetForm from '../components/Dataset/Form';

// Widget
import WidgetForm from '../components/Widget/Form';

// Layer
import LayerForm from '../components/Layer/Form';

// Form Elements
import Field from '../components/Form/Field';
import Input from '../components/Form/Input';
import Textarea from '../components/Form/Textarea';
import Select from '../components/Form/Select';
import Token from '../components/Form/Token';
import CheckboxGroup from '../components/Form/CheckboxGroup';
import RadioGroup from '../components/Form/RadioGroup';
import Navigation from '../components/Form/Navigation';

storiesOf('Dataset', module)
  .add('Form', () => {
    return (
      <DatasetForm
        api="https://api.resourcewatch.org"
        application={['rw']}
        authorization=""
        dataset="f3d6d6c1-3b3b-4dfc-a2a0-dcf38d258ae9"
      />
    );
  })

storiesOf('Widget', module)
  .add('Form', () => {
    return (
      <WidgetForm
        api="https://api.resourcewatch.org"
        application={['rw']}
        authorization=""
        dataset="89a6358e-27eb-4b9c-9f0d-befc4959f914"
        widget="61628091-8679-4db8-bc47-851c51784f32"
      />
    );
  })

storiesOf('Layer', module)
  .add('Form', () => {
    return (
      <LayerForm
        api="https://api.resourcewatch.org"
        application={['rw']}
        authorization=""
        dataset="b7bf012f-4b8b-4478-b5c9-6af3075ca1e4"
        layer="7a46cc6f-a54d-4385-be60-46a18c437a3b"
      />
    );
  })

storiesOf('Form Elements', module)
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
  .add('CheckboxGroup', () => {
    return (
      <Field
        // onChange={value => this.props.onChange({ name: value })}
        onChange={value => console.info(value)}
        validations={['required']}
        options={[
          { label: 'Cities', value: 'cities' },
          { label: 'Climate', value: 'climate' },
          { label: 'Energy', value: 'energy' },
          { label: 'Forests', value: 'forests' }
        ]}
        properties={{
          name: 'applications',
          label: 'Applications',
          required: true,
          default: ['cities']
        }}
      >
        {CheckboxGroup}
      </Field>
    );
  })
  .add('RadioGroup', () => {
    return (
      <Field
        // onChange={value => this.props.onChange({ name: value })}
        onChange={value => console.info(value)}
        validations={['required']}
        options={[
          { label: 'Cities', value: 'cities' },
          { label: 'Climate', value: 'climate' },
          { label: 'Energy', value: 'energy' },
          { label: 'Forests', value: 'forests' }
        ]}
        properties={{
          name: 'applications',
          label: 'Applications',
          required: true,
          default: 'cities'
        }}
      >
        {RadioGroup}
      </Field>
    );
  })
  .add('Navigation', () => {
    return (
      <Navigation
        step={2}
        stepLength={4}
        // submitting={true}
        onBack={step => console.info(step)}
      />
    );
  })
