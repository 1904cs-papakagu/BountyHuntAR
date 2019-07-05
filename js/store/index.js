import { createStore, applyMiddleware, combineReducers } from 'redux';
import { loggingMiddleware, thunkMiddleware, socketMiddleware } from './middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import { user, loginThunk } from './reducers/users';
import game, { startGame, endGame, resetStatus } from './reducers/game';
import {
  location,
  getActiveLocationThunk,
  setInactiveThunk,
  getAllActiveLocationThunk
} from './reducers/locations';

import socket from './socket';

socket.connect();

const reducer = combineReducers({
  user,
  location,
  game
});

export default createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(
      loggingMiddleware,
      thunkMiddleware,
      socketMiddleware
    )
  )
);

export {
  loginThunk,
  getActiveLocationThunk,
  setInactiveThunk,
  startGame,
  endGame,
  getAllActiveLocationThunk,
  resetStatus
};
