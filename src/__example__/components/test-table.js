/**
 * TestTable
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'

/* Components =================================================================================== */
import {
  Col,
  Row,
  Table,
} from '../..'

/* Actions ====================================================================================== */
import {
  getName,
  setFilter,
  setInitialValues
} from '../actions'

/* Test Data ==================================================================================== */
import {
  TEST_HEADERS,
  TEST_ROWS,
} from '../test-data'

/* Test Table =================================================================================== */
class TestTable extends Component {
  render () {
    const rows = TEST_ROWS
    const noRows = null
    const emptyRows = []
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
    
    return (
      <Table
        displayEmpty
        sortedField={ sortedField }
        sortIcon={ sortIcon }
        // headers={TEST_HEADERS}
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
              <Col onClick={() => { console.log(row) }}>{row[0]}</Col>
              <Col>{row[1]}</Col>
              <Col>{row[2]}</Col>
            </Row>
          })
          // emptyRows
          // noRows
        }
      </Table>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    test: state.test,
    initialValues: state.test.initialValues
  }
}

/* Export ======================================================================================= */
export default connect(
  mapStateToProps,
  {
    getName,
    setFilter,
    setInitialValues
  }
)(TestTable)