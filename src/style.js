import { cssRule, cssRaw } from 'typestyle'

export default () => {
  cssRaw('@import url(\'https://fonts.googleapis.com/css?family=Roboto\');')

  cssRule('body', {
    backgroundColor: '#f0f0f0',
    padding: 0,
    margin: 0,
    fontSize: 13,
    color: 'rgb(41, 54, 66)',
    overflowX: 'hidden',
  })

  cssRule('@media print', {
    $nest: {
      '.no-print': {
        display: 'none'
      }
    }
  })

  cssRule('th', {
    textAlign: 'left'
  })

  cssRule('*', {
    fontFamily: 'Open Sans',
    boxSizing: 'border-box'
  })

  cssRule('label', {
    display: 'inline-block',
    maxWidth: '100%',
    marginBottom: 5,
    fontWeight: 700
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

  cssRule('.hr-line-dashed', {
    borderTop: '1px dashed #e7eaec',
    color: '#ffffff',
    height: 1,
    margin: '14px 0'
  })
}
