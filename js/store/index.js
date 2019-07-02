import { createStore, applyMiddleware, combineReducers } from 'redux';
import { loggingMiddleware, thunkMiddleware } from './middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import { user, loginThunk } from './reducers/users';
import {
  location,
  getActiveLocationThunk,
  setInactiveThunk
} from './reducers/locations';

const reducer = combineReducers({
  user,
  location
});

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(loggingMiddleware, thunkMiddleware))
);

export { loginThunk, getActiveLocationThunk, setInactiveThunk };
