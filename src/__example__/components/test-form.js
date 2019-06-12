/**
 * TestForm
 */
import React, { Component } from 'react'
import {
  Field,
  FieldArray,
  reduxForm,
} from 'redux-form'
import { connect } from 'react-redux'

/* Components =================================================================================== */
import {
  Cards,
  Col,
  Dropbox,
  DateTimePicker,
  DropdownList,
  Form,
  FormSection,
  Quill,
  Roll,
  Row,
  Search,
  TextField,
  Toggle,
  Toolbar,
  validation,
  ToolbarTitleContainer,
  ToolbarButton,
  ToolbarBreak,
  ToolbarDropdown,
  ToolbarMenu,
  ToolbarMenuItem,
  ToolbarTitle
} from '../..'

/* Actions ====================================================================================== */
import {
  getName,
  setFilter,
  setInitialValues
} from '../actions'

/* Test Data ==================================================================================== */
import { TEST_CARD_MODEL } from '../field-models/card-model'
import { ROLL_MODEL } from '../field-models/roll-model'
import {
  WEATHER_TYPES,
  TEST_HEADERS,
  TEST_ROWS,
  TEST_USERS
} from '../test-data'

/* Test Form ==================================================================================== */
class TestForm extends Component {
  state = {
    dropdownIndex: 0,
    displaySearch: false
  }

  render () {
    return <div>
      <Form
        title={this.renderToolbar()}
        tools={[
          <ToolbarButton
            label={ 'Set initialValues' }
            onClick={() => {
              this.props.setInitialValues({date: "May 12, 2019 07:34 PM", roll: {index: 1, description: "<p>aergaerg</p>"}})
            }}
          />,
          <ToolbarButton
            label={ 'Reset initialValues' }
            onClick={() => {
              this.props.setInitialValues({})
            }}
          />,
          <ToolbarBreak />
        ]}
        onKeyPress={ testKeys }
      >
        <FormSection>
          <Field
            label='Date'
            name='date'
            showTime={false}
            component={DateTimePicker}
            defaultValue={new Date()}
            validate={[validation.required]}
            isRequired
          />
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
            defaultValue='hello'
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
          data={{ users: TEST_USERS }}
          model={TEST_CARD_MODEL}
        />
      </Form>
    </div>
  }

  renderToolbar () {
    return <div>
      <Search
        searchText={ this.props.test.filterData.search }
        setSearchText={searchText => {
          this.props.setFilter({
            search: searchText
          })
        }}
        resetSearch={() => {
          this.props.setFilter({
            search: []
          })
        }}
        onKeyPress={ testKeys }
        onToggle={() => {
          this.setState({
            displaySearch: !this.state.displaySearch
          })
        }}
        toggled={this.state.displaySearch}
      />
      { !this.state.displaySearch &&
        this.renderTitle()
      }
      
    </div>
  }

  renderTitle () {
    return (
      <ToolbarTitleContainer>
        <ToolbarTitle
          title='Projects'
        />
        <ToolbarMenu
          // to={'https://www.google.com'}
          heading={ 'Project X' }
          width={ 180 }
          maxHeight={ 250 }
        >
          {
            (() => {
              const rows = []
              for (let i = 0; i < 30; ++i) {
                rows.push( <ToolbarMenuItem content={ 'Project ' + i }/>)
              }
              return rows
            })()
          }

        </ToolbarMenu>
        <ToolbarMenu
          heading={ 'Dailies' }
          width={180}
          onClick={() => { console.log('clicked menu') }}
        >
          <ToolbarMenuItem content={ 'Analysis' } onClick={() => { console.log('clicked item') }}/>
          <ToolbarMenuItem content={ 'Trades' } onClick={() => { console.log('clicked item') }}/>
          <ToolbarMenuItem content={ 'Users' }/>
          <ToolbarMenu
            heading={ 'HSE Dailies' }
            // to={'https://www.google.com'}
            width={180}
            offset={180}
            submenu
            onClick={() => { console.log('clicked menu') }}
          >
            <ToolbarMenuItem content={ 'HSE Dailies List' }/>
            <ToolbarMenuItem content={ 'Analysis' }/>
          </ToolbarMenu>
          <ToolbarMenu
            heading={ 'Concrete Pours' }
            width={220}
            offset={180}
            submenu
          >
            <ToolbarMenuItem content={ 'Pours List' }/>
            <ToolbarMenuItem content={ 'Analysis' }/>
            <ToolbarMenuItem content={ 'Concrete Mixes List' }/>
            <ToolbarMenuItem content={ 'Concrete Addons List' }/>
          </ToolbarMenu>
          <ToolbarMenu
            heading={ 'Cost Tracking' }
            width={180}
            offset={180}
            submenu
          >
            <ToolbarMenuItem content={ 'Cost Tracking List' }/>
            <ToolbarMenuItem content={ 'Analysis' }/>
            <ToolbarMenuItem content={ 'Budget List' }/>
          </ToolbarMenu>
        </ToolbarMenu>

        <ToolbarDropdown
          data={
            [
              {name: 'item1'},
              {name: 'item2'},
              {name: 'item3'}
            ]
          }
          value={this.state.dropdownIndex}
          onChange={
            (index) => {
              this.setState({dropdownIndex: index})
            }
          }
        />
      </ToolbarTitleContainer>
    )
  }

  componentDidMount () {
    this.props.setFilter({
      sort: 'name field'
    })
    this.props.getName()

    window.addEventListener('keypress', this.handleKeyPress)
  }

  handleKeyPress = (event) => {
    console.log(`key press event happened! Key < ${event.key} > was pressed`)
  }
}

const testKeys = (event) => {
  const key = event.key
  const ingoredKeys = [
    'p',
    '[',
    ']',
    '\\'
  ]

  if (ingoredKeys.includes(key)) {
    console.log('form event - key ignored', key)
    event.stopPropagation()
  } else {
    console.log('form event - key pressed', key)
  }
  
  // alternatively, event.stopPropigation() could be called
  // without any checks to ignore all key presses
}

const mapStateToProps = (state) => {
  return { 
    test: state.test,
    initialValues: state.test.initialValues
  }
}

TestForm = reduxForm({
  form: 'test-form',
  destroyOnUnmount: false,
  enableReinitialize: true
})(TestForm)

/* Export ======================================================================================= */
export default connect(
  mapStateToProps,
  {
    getName,
    setFilter,
    setInitialValues
  }
)(TestForm)