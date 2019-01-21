/**
 * modules/dropdown/dropdown.jsx
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 * @flow
 */
import * as React from 'react'
import type { FieldProps } from 'redux-form'
import { cssRule } from 'typestyle'
import Select from 'react-select'
// $FlowFixMe
// import 'react-select/dist/react-select.css'

/* Commons =================================================================================== */
import THEME from '../theme'

/* Components =================================================================================== */
import { FieldWrapper } from '..'

/* <DropDown /> ================================================================================= */
export default class DropDown extends React.Component<*, *> {
  props: {
    data: [],
    generateLabel: Function,
    horizontal: boolean,
    isRequired: boolean,
    label: string,
    onChange: Function,
    onFilterChange: Function,
    onInitialFilterChange: Function,
    optionRenderer: React.Node,
    textField: React.Node,
    valueField: React.Node,
    valueRenderer: React.Node,
  } & FieldProps

  render () {
    const {
      // optionRenderer,
      // valueRenderer,
      data,
      generateLabel,
      horizontal,
      input,
      isRequired,
      label,
      meta,
      onFilterChange,
      helpbox
    } = this.props

    if (generateLabel) {
      data.map(item => {
        item.label = generateLabel(item.value)
      })
    }

    return (
      <FieldWrapper
        horizontal={horizontal}
        id={input.name}
        label={label}
        isRequired={isRequired}
        helpbox={helpbox}
        {...meta}
      >
        <Select
          {...input}
          id={`jams-${input.name}`}
          clearable={false}
          className={'no-select'}
          busy={!data}
          /** Need to filter 'empty' elements */
          options={data.filter(e => e)}
          onBlurResetsInput={false}
          /** Need to investigate below, value will reset if you don't to following */
          onBlur={() => { return null }}
          defaultValue={meta.initial}
          filterProp={'label'}
          valueRenderer={value => {
            if (generateLabel) {
              return generateLabel(value)
            }
            return value.label
          }}
          // valueField={valueField}
          onChange={({ value }) => {
            input.onChange(value)

            if (onFilterChange) {
              onFilterChange(value)
            }
          }}
        />
      </FieldWrapper>
    )
  }

  componentDidMount () {
    const { meta, onInitialFilterChange } = this.props
    if (onInitialFilterChange) {
      onInitialFilterChange(meta.initial)
    }
  }
}

cssRule('.Select-control', {
  border: 'none',
  borderBottom: '1px solid #e5e6e7',
  borderRadius: '0',
  transition: 'border-color 0.15s !important',
  transitionTimingFunction: 'ease-in-out !important',
  $nest: {
    '&:hover': {
      boxShadow: 'none !important'
    }
  }
})
cssRule('.Select-value, .Select-placeholder, .Select-input', {
  paddingLeft: '0px !important',
  paddingRight: '0px !important'
})
cssRule('.is-focused .Select-control', {
  boxShadow: 'none !important',
  borderColor: `${THEME.primary} !important`
})

cssRule('.Select-placeholder', {
  color: THEME.text.placeholder
})