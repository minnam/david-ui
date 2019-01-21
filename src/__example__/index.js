import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import reducer from './reducer'
import App from './app'
import logger from 'redux-logger'
import { applyMiddleware, createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const store = createStore(
  combineReducers({
    test: reducer,
    form: formReducer
  }),
  applyMiddleware(logger)
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)