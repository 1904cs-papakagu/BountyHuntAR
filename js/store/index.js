import { createStore, applyMiddleware, combineReducers } from 'redux';
import { loggingMiddleware, thunkMiddleware } from './middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import { user, loginThunk } from './reducers/users'

const reducer = combineReducers({
  user
})

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(loggingMiddleware, thunkMiddleware))
)

export {
  loginThunk
}
