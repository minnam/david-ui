import { GET_NAME } from './actions'

const exampleForm = (state = {}, action) => {
  switch (action.type) {
  case GET_NAME:
    return {
      ...state,
      name: action.name
    }
  default:
    return state
  }
}

export default exampleForm