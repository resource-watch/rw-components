import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';

import './style.scss';

// Dataset
import DatasetForm from '../src/components/dataset/form/DatasetForm';
import DatasetTable from '../src/components/dataset/table/DatasetTable';
import DatasetList from '../src/components/dataset/DatasetList';
import DatasetCard from '../src/components/dataset/DatasetCard';

// Widget
import WidgetForm from '../src/components/widget/form/WidgetForm';
import WidgetList from '../src/components/widget/WidgetList';
import WidgetCard from '../src/components/widget/WidgetCard';
import WidgetWizard from '../src/components/widget/wizard/WidgetWizard';


// Layer
import LayerForm from '../src/components/layer/form/LayerForm';

// Form Elements
import Field from '../src/components/form/Field';
import Input from '../src/components/form/Input';
import Textarea from '../src/components/form/TextArea';
import Select from '../src/components/form/SelectInput';
import Token from '../src/components/form/Token';
import CheckboxGroup from '../src/components/form/CheckboxGroup';
import RadioGroup from '../src/components/form/RadioGroup';
import Navigation from '../src/components/form/Navigation';

// UI
import Modal from '../src/components/ui/modal/Modal';
import Title from '../src/components/ui/Title';

storiesOf('Dataset', module)
  .add('Form', () => {
    return (
      <DatasetForm
        api='https://api.resourcewatch.org/v1'
        application={['rw']}
        dataset="223b936e-06b8-4970-abd9-4f123904d95d"
      />
    );
  })
  .add('Table', () => {
    return (
      <DatasetTable />
    );
  })
  .add('List', () => {
    return (
      <DatasetList
        application={['rw']}
      />
    );
  })
  .add('Card', () => {
    return (
      <DatasetCard
        dataset={{
          name: 'Test',
          widget: [{},{},{}],
          layer: [{}]
        }}
        properties={{}}
      />
    );
  })


storiesOf('Widget', module)
  .add('Form', () => {
    return (
      <WidgetForm
        api="https://api.resourcewatch.org/v1"
        application={['rw']}
        authorization=""
        dataset="89a6358e-27eb-4b9c-9f0d-befc4959f914"
        widget="61628091-8679-4db8-bc47-851c51784f32"
      />
    );
  })
  .add('List', () => {
    return (
      <WidgetList
        application={['rw']}
        dataset={{
          id: "d02df2f6-d80c-4274-bb6f-f062061655c4"
        }}
      />
    );
  })
  .add('Card', () => {
    return (
      <WidgetCard
        widget={{
          name: 'Test'
        }}
        properties={{}}
      />
    );
  })
  .add('Wizard', () => {
    return (
      <WidgetWizard
        application={['rw']}
      />
    );
  })

storiesOf('Layer', module)
  .add('Form', () => {
    return (
      <LayerForm
        api="https://api.resourcewatch.org/v1"
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

  storiesOf('UI', module)
    .add('Modal', () => {
      return (
        <Modal
          open={true}
          options={{ children: Title, childrenProps: { children: <h1>Modal</h1> } }}
        />
      );
    })
