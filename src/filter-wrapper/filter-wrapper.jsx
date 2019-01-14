/**
 * modules/filter/index.jsx
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 * @flow
 */
import React from 'react'
import { Field } from 'redux-form'
import { stylesheet } from 'typestyle'

/* Components =================================================================================== */
import {
  DropdownList,
  Button,
  validation
} from '..'

/* Constants  =================================================================================== */
const FILTER_OPTIONS = [
  { label: 'Equal', value: '$eq' },
  { label: 'Greater Than', value: '$gte' },
  { label: 'Less Than', value: '$lte' },
  { label: 'Between', value: 'between' },
  { label: 'Not Equal', value: '$ne' },
]

/* <FilterWrapper /> ============================================================================ */
export const FilterWrapper = (props: {
  children: *,
  isNumeric: *,
  values: *,
  resetField: (field: string) => void
}) => {
  const {
    children,
    isNumeric,
    values
  } = props

  let name = children.props.name.split('.')
  name = name[name.length - 1]

  const isBetween = values && values[`${name}Option`] === 'between'

  return <div className={CLASSNAMES.filterWrapperParent}>
    <div
      style={{
        width: isBetween ? '33.333%' : '66.666%'
      }}
    >
      {
        (() => {
          if (isBetween) {
            return React.cloneElement(children, {
              label: `${children.props.label} (1)`,
              name: `${children.props.name}`,
            })
          }

          return children

        })()
      }
    </div>
    {
      (() => {
        if (isBetween) {
          return <div className={CLASSNAMES.filterWrapperSecondaryInputParent}>
            {
              React.cloneElement(children, {
                label: `${children.props.label} (2)`,
                name: `${children.props.name}2`,
              })
            }
          </div>
        }
      })()
    }
    <div className={CLASSNAMES.filterWrapperOptionParent}>
      <Field
        label='Option'
        name={`${children.props.name}Option`}
        component={DropdownList}
        data={(() => {
          if (isNumeric) {
            return FILTER_OPTIONS
          }

          return [
            FILTER_OPTIONS[0], // Equal
            FILTER_OPTIONS[4] // Not equall
          ]
        })()}
        validate={(() => {
          if (values && values[name]) {
            return [validation.required]
          }
        })()}
        textField='name'
      />
    </div>
    <Button
      label={<i className='material-icons'>close</i>}
      role='circle'
      style={{
        marginLeft: 7.5,
        padding: '5px 7px',
        color: ''
      }}
      onClick={() => {
        props.resetField(children.props.name)
        props.resetField(`${children.props.name}Option`)
      }}
    />
  </div>
}

/* Styles ======================================================================================= */
const CLASSNAMES = stylesheet({
  filterWrapperParent: {
    display: 'flex',
    flexDirection: 'row'
  },
  filterWrapperSecondaryInputParent: {
    width: '33.333%'
  },
  filterWrapperOptionParent: {
    width: '33.333%'
  }
})