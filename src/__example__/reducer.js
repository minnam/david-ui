import { 
  GET_NAME, 
  SET_FILTER,
  SET_INITIAL_VALUES
} from './actions'

const INITIAL_STATE = {
  name: '',
  filterData: {},
}
const exampleForm = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_NAME:
    return {
      ...state,
      name: action.name,
    }
  case SET_FILTER:
    return {
      ...state,
      filterData: action.filterData
    }
  case SET_INITIAL_VALUES:
    return {
      ...state,
      initialValues: action.initialValues
    }
  default:
    return state
  }
}

export default exampleForm