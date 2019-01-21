import { cssRule, cssRaw } from 'typestyle'

export default () => {
  cssRaw('@import url(\'https://fonts.googleapis.com/css?family=Roboto\');')

  cssRule('body', {
    fontSize: 13,
    color: 'rgb(41, 54, 66)',
    overflowX: 'hidden'
  })

  cssRule('*', {
    fontFamily: 'Open Sans'
  })

  cssRule('label', {
    display: 'inline-block',
    maxWidth: '100%',
    marginBottom: 5,
    fontWeight: 700
  })
}