/**
 * modules/geosuggest/geosuggest.jsx
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 *  Derek Hirotsu, dhirotsu@ventanaconstruction.com
 *
 * @flow
 */
import React from 'react'
import Geosuggest from 'react-geosuggest'
import { cssRule } from 'typestyle'

/* Common ======================================================================================= */
import THEME from '../theme'

/* Components =================================================================================== */
import { FieldWrapper } from '..'

/* <GeosuggestField /> ========================================================================== */
const GeosuggestField = (props: {
  input: *,
  /** The label for the input field. */
  label: string,
  meta: *
}) => {
  const {
    input,
    label,
    meta,
    helpbox
  } = props

  return (
    <FieldWrapper
      label = {label}
      id={input.name}
      helpbox={helpbox}
      {...meta}
    >
      <Geosuggest
        initialValue={input.value}
        onSuggestSelect={(suggest) => {
          if (!suggest) {
            return input.onChange(null)
          }
          return input.onChange(suggest.label)
        }}
        {...input}
      />
    </FieldWrapper>
  )
}
export default GeosuggestField

/* Styles ======================================================================================= */
cssRule('.geosuggest', {
  background: THEME.background.primary,
  $nest: {
    '&:empty': {
      boxShadow: 'none',
    },
  },
})

cssRule('.geosuggest__input', {
  fontFamily: 'inherit',
  height: 36,
  outline: 'none',
  padding: '6px 0px 6px 0px',
  transition: 'border-color 0.15s',
  transitionTimingFunction: 'ease-in-out',
  width: '100%',
  $nest: {
    '&:focus': {
      borderColor: THEME.primary
    }
  }
})

cssRule('.geosuggest__suggests', {
  background: THEME.background.primary,
  boxShadow: THEME.background.shadow,
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  position: 'absolute',
  width: '100%',
  zIndex: 2,
})

cssRule('.geosuggest__suggests--hidden', {
  display: 'none',
})

cssRule('.geosuggest__item', {
  cursor: 'pointer',
  padding: '12px 15px',
  $nest: {
    '&:hover': {
      background: THEME.background.disabled,
    }
  }
})