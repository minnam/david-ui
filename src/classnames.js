/**
 * common/classnames
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 *
 * @flow
 */
import { style, cssRule } from 'typestyle'

cssRule('body', {
  background: 'white',
  padding: 0,
  margin: 0
})

cssRule('a', {
  color: '#337ab7',
  textDecoration: 'none',
  $nest: {
    '&:hover': {
      color: '#23527c'
    }
  }
})

cssRule('input', {
  border: 'none',
  borderBottom: '1px solid #e5e6e7',
  paddingLeft: '0 !important',
  paddingRight: '0 !important'
})

cssRule('.no-select', {
  userSelect: 'none',
  '-moz-user-select': 'none',  /* Firefox */
  '-ms-user-select': 'none',   /* Internet Explorer/Edge */
})

export default {
  ibox: style({
    clear: 'both',
    marginBottom: 0,
    marginTop: 0,
    padding: 0
  }),
  iboxContent: style({
    // boxShadow: '1px 1px 1px 1px rgba(0,0,0,0.07)'
  }),
  iboxTools: style({
    display: 'flex',
    float: 'none',
    marginTop: 0,
    position: 'relative',
    padding: 0,
    textAlign: 'right'
  }),
  input: style({
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #e5e6e7',
    borderRadius: 1,
    color: 'inherit',
    display: 'block',
    padding: '6px 12px',
    transition: 'border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s',
    $nest: {
      '&:focus': {
        borderColor: '#1ab394',
        outline: 'none'
      }
    }
  }),
  pullLeft: style({
    float: 'left'
  }),
  pullRight: style({
    float: 'right'
  }),
  wrapperContent: style({
    marginTop: 72,
    padding: 0
  }),
  flex: style({
    display: 'flex'
  }),
  title: style({
    lineHeight: '30px',
    fontWeight: 600,
    fontSize: 16,
    marginTop: 0,
    marginBottom: 0,
    $nest: {
      '@media print': {
        marginLeft: '0 !important'
      }
    }
  }),
  marginRight: style({
    marginRight: 15
  }),
  marginLeft: style({
    marginLeft: 15
  }),
  marginBottom: style({
    marginBottom: 15
  })
}