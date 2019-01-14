/**
 * common/format
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 *
 * @flow
 */

/** Month names */
export const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const monthDiff = (date1: Date, date2: Date) => {
  let months
  months = (date2.getFullYear() - date1.getFullYear()) * 12
  months -= date1.getMonth() + 1
  months += date2.getMonth()

  return months <= 0 ? 0 : months
}

/**
 * Format date
 */
const PM = 'PM'
const AM = 'AM'
type formatDateParam = {
  year?: boolean,
  month?: boolean,
  day?: boolean,
  time?: boolean,
  seconds?: boolean
}

export const formatDate = (dateString: string | Date, display: formatDateParam) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const monthIndex = date.getMonth()

  display = {
    year: true,
    month: true,
    day: true,
    time: true,
    seconds: false,
    ...display
  }

  let day = date.getDate()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let seconds = date.getSeconds()
  let meridiem = AM
  let formattedDate = ''

  if (hours > 12 ) {
    hours = Math.round(hours - 12)
    meridiem = PM
  }

  if (day < 10) {
    day = `0${day}`
  }

  if (hours < 10) {
    hours = `0${hours}`
  }

  if (minutes < 10) {
    minutes = `0${minutes}`
  }

  if (seconds < 10) {
    seconds = `0${seconds}`
  }

  if(display.month) {
    formattedDate += `${MONTH_NAMES[monthIndex]} `
  }
  if(display.day) {
    formattedDate += `${day}, `
  }
  if(display.year) {
    formattedDate += `${year} `
  }
  if (display.time) {
    if (display.seconds) {
      formattedDate += `${hours}:${minutes}:${seconds} ${meridiem}`
    } else {
      formattedDate += `${hours}:${minutes} ${meridiem}`
    }
  }

  return formattedDate
}

export const formatTime = (time: string) => {
  const splitted = time.split(':')

  let hours = parseInt(splitted[0])
  let minutes = parseInt(splitted[1])
  let meridiem = AM

  if (hours > 12 ) {
    hours = Math.round(hours - 12)
    meridiem = PM
  }

  if (hours < 10) {
    hours = `0${hours}`
  }

  if (minutes < 10) {
    minutes = `0${minutes}`
  }

  return `${hours}:${minutes} ${meridiem}`
}

/**
 * Turn float to formatted price
 */
export const formatPrice = (price: number, sign: boolean = true) => {
  return `${sign ? '$' : ''}${Number(price).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}`
}

/**
 * Turn boolean in to yes or no
 */
export const formatBool = (bool: boolean) => {
  return bool ? 'Yes' : 'No'
}

/**
 * Parse value with given unit
 */
export const formatUnit = (value: number | string, unit: string) => {
  return `${value} ${unit}`
}

/**
 * Format float to given precision
 */
export const formatFloat = (value: number, fixed: number) => {
  if (value == null) {
    return null
  }

  return parseFloat(value).toFixed(fixed)
}

/**
 * Normalize phone number
 */
export const normalizePhone = (value: String) => {
  if (!value) {
    return value
  }

  const onlyNums = value.replace(/[^\d]/g, '')
  if (onlyNums.length <= 3) {
    return onlyNums
  }
  if (onlyNums.length <= 7) {
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`
  }
  return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`
}

export const normalizeTime = (value: String) => {
  if (!value) {
    return value
  }

  const onlyNums = value.replace(/[^\d]/g, '')
  if (onlyNums.length <= 2) {
    return onlyNums
  }

  if (onlyNums.length <= 4) {
    return `${onlyNums.slice(0, 2)}:${onlyNums.slice(2)}`
  }
}