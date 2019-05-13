export const GET_NAME = 'get_name'
export const SET_FILTER = 'set_filter'
export const SET_INITIAL_VALUES = 'set_initial_values'

export const getName = () => {
  return {
    type: GET_NAME,
    name: 'David',
  }
}

export const setFilter = (filterData) => {
  return {
    type: SET_FILTER,
    filterData
  }
}

export const setInitialValues = initialValues => {
  return {
    type: SET_INITIAL_VALUES,
    initialValues
  }
}