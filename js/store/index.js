import { createStore, applyMiddleware, combineReducers } from 'redux';
import { loggingMiddleware, thunkMiddleware } from './middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import { users } from './reducers/users'

const reducer = combineReducers({
  users
})

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(loggingMiddleware, thunkMiddleware))
)
