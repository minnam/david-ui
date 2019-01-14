/**
 * form/validation
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 */
/** refactor this */
const validation = {
  required: value => (value || value === 0) ? undefined : 'Required',
  /** date validation does not work */
  date: value => new Date(value) === 'Invalid Date' ? 'Invalid Date' : undefined,
  maxLength: max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined,
  number: value => value && isNaN(Number(value)) ? 'Must be a number' : undefined,
  minValue: min => value =>
    value && value < min ? `Must be at least ${min}` : undefined,
  email: value =>
    value && !/^[A-Z0-9'._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
      'Invalid email address' : undefined,
  jobNum: value =>
    value && !/^[A-Z]{1}[-]{1}\d{3}$/i.test(value) ? 'Invalid Project Number' : undefined,
  phone: value =>
    value && !/^\d{3}[-]{1}\d{3}[-]{1}\d{4}$/i.test(value) ?
      'Invalid phone number' : undefined,
  time: value =>
    value && !/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value) ?
      'Invalid time format (00:00)' : undefined
}

export default validation