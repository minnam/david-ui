const reqlib = require('app-root-path').require
let theme = require('../tmp/theme.js')
theme = theme.default

try {  
  const customTheme = reqlib('/david-ui.theme.js')
  theme = {
    ...theme,
    ...customTheme.default
  }
} catch (e) {
  // No need to handle
}

export default theme