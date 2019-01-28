import React, { Component } from 'react'
import {
  Field,
  FieldArray,
  reduxForm,
} from 'redux-form'
import { connect } from 'react-redux'

import { Cards, Dropbox, Form, Roll, TextField, FormSection, DropdownList, Quill, validation } from '../'
import { getName } from './actions'

import { TEST_CARD_MODEL } from './card-model'
import { ROLL_MODEL } from './roll-model'

export const WEATHER_TYPES = [
  { label: 'Sunny', value: 'Sunny' },
  { label: 'Rainy', value: 'Rainy' },
  { label: 'Overcast', value: 'Overcast' },
  { label: 'Partly cloudy', value: 'Partly cloudy' },
  { label: 'Light rain', value: 'Light rain' },
  { label: 'Foggy', value: 'Foggy' },
  { label: 'Shower', value: 'Shower' },
  { label: 'Snow', value: 'Snow' },
  { label: 'Windy', value: 'Windy' },
  { label: 'Misty', value: 'Misty' },
  { label: 'Hail', value: 'Hail' },
  { label: 'Heavy snow', value: 'Heavy snow' },
  { label: 'Rain/Snow', value: 'Rain/Snow' },
  { label: 'Strong wind', value: 'Strong wind' },
  { label: 'Thunderstorm', value: 'Thunderstorm' },
]

class TestForm extends Component {
  componentDidMount () {
    this.props.getName()
  }

  render () {
    return <Form>
      <FormSection>
        <Field
          label='Weather AM'
          name='weatherAm'
          type='text'
          component={DropdownList}
          data={WEATHER_TYPES}
          validate={[validation.required]}
          isRequired
        />
        <FieldArray
          label='Attachments'
          name='workCompletedAttachments'
          component={Dropbox}
          onDrop={this.props.uploadImages}
        />
        <Field
          label='Name'
          name='name'
          component={TextField}
        />
        <Field
          label='Quill Test'
          name='quilltest'
          component={Quill}
        />
        <Field
          label={'test-roll'}
          name={'roll'}
          component={Roll}
          model={ROLL_MODEL}
        />
      </FormSection>
      <FieldArray
        label='Test'
        name='test'
        component={Cards}
        model={TEST_CARD_MODEL}
      />
    </Form>
  }
}

TestForm = reduxForm({
  form: 'test-form',
  destroyOnUnmount: false,
  enableReinitialize: true
})(TestForm)

export default connect(
  () => {
    return {}
  }, {
    getName
  }
)(TestForm)