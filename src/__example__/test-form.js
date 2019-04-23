import React, { Component } from 'react'
import {
  Field,
  FieldArray,
  reduxForm,
} from 'redux-form'
import { style } from 'typestyle'
import { connect } from 'react-redux'

import {
  Table,
  Row,
  Col,
  Cards, Dropbox, Form, Roll, TextField, FormSection, DropdownList, Quill, validation } from '../'
import { getName, setFilter } from './actions'

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

const HAZARD_RATINGS_HEADERS = [
  {
    name: 'Name',
    size: 0.3,
    field: 'name field'
  },
  {
    name: 'Positive',
    size: 0.2,
    field: 'positive field'
  },
  {
    name: 'Negative',
    size: 0.5,
    // field: 'negative field',
    className: style({ textAlign: 'right' })
  },
]

const TEST_ROWS = [
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
  ['test', 5, 6],
]

class TestForm extends Component {
  componentDidMount () {
    this.props.setFilter({
      sort: 'name field'
    })
    this.props.getName()
  }

  render () {
    const { test } = this.props
    let sortedField = ''
    let sortIcon = ''

    if (test.filterData.sort) {
      if (test.filterData.sort.charAt(0) === '-') {
        sortedField = test.filterData.sort.substr(1)
        sortIcon = 'keyboard_arrow_down'
      } else {
        sortedField = test.filterData.sort
        sortIcon = 'keyboard_arrow_up'
      }
    }

    return <div>
      <Table
        sortedField={ sortedField }
        sortIcon={ sortIcon }
        headers={HAZARD_RATINGS_HEADERS}
        headerOnClick={
          (field) => {
            let sortedField = field
            if(test.filterData.sort === sortedField) {
              sortedField = `-${sortedField}`
            }
            // simulating dispatching of set filter action in GET action
            this.props.setFilter({
              sort: sortedField
            })
            this.props.getName()
          }
        }
      >
        {
          TEST_ROWS.map((row, key) => {
            return <Row key={key}>
              <Col>{row[0]}</Col>
              <Col>{row[1]}</Col>
              <Col>{row[2]}</Col>
            </Row>
          })
        }
      </Table>
      <Form>
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
    </div>
  }
}

TestForm = reduxForm({
  form: 'test-form',
  destroyOnUnmount: false,
  enableReinitialize: true
})(TestForm)

export default connect(
  (state) => {
    return { test: state.test }
  }, {
    getName,
    setFilter
  }
)(TestForm)