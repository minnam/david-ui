import { cssRule, cssRaw } from 'typestyle'

export default () => {
  cssRaw('@import url(\'https://fonts.googleapis.com/css?family=Roboto\');')

  cssRule('body', {
    fontSize: 13,
    color: 'rgb(41, 54, 66)',
    overflowX: 'hidden'
  })

  cssRule('body', {
    backgroundColor: '#f0f0f0'
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
}

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
