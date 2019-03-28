import { createStore, compose, applyMiddleware } from 'redux'
import assetsReducer from './reducers'
import thunk from 'redux-thunk'

export default createStore(
  assetsReducer,
  compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f)
)
