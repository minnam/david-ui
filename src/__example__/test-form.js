import React, { Component } from 'react'
import {
  Field,
  FieldArray,
  reduxForm,
} from 'redux-form'
import { connect } from 'react-redux'

import { Cards, Dropbox, Form, TextField, FormSection } from '../'
import { getName } from './actions'

import { TEST_CARD_MODEL } from './card-model'

class TestForm extends Component {
  componentDidMount () {
    this.props.getName()
  }

  render () {
    console.log(this.props)
    return <Form>
      <FormSection>
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