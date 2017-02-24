import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';

import Field from '../components/Form/Field';
import Input from '../components/Form/Input';

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
