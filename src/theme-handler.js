export default () => {
  let theme = require('../tmp/theme.js')
  theme = theme.default

  if (window['david-ui']) {
    if (window['david-ui'].theme) {
      theme = {
        ...theme,
        ...window['david-ui'].theme
      }
    }
  }

  return theme
}