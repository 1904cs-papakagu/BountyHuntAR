import { createStore, applyMiddleware, combineReducers } from 'redux';
import {
  loggingMiddleware,
  thunkMiddleware,
  socketMiddleware
} from './middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import { user, loginThunk, setCrosshair, signUpThunk } from './reducers/users';
import game, {
  startGame,
  endGame,
  resetStatus,
  exitGame,
  setBullets,
  reloading,
  setShooting,
  resetShooting,
  toggleShot,
} from './reducers/game';
import {
  location,
  getActiveLocationThunk,
  setInactiveThunk,
  getAllActiveLocationThunk
} from './reducers/locations';

import socket, { sendPosition } from './socket';

socket.connect();

const reducer = combineReducers({
  user,
  location,
  game
});

export default createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(loggingMiddleware, thunkMiddleware, socketMiddleware)
  )
);

export {
  loginThunk,
  getActiveLocationThunk,
  setInactiveThunk,
  startGame,
  endGame,
  getAllActiveLocationThunk,
  resetStatus,
  setCrosshair,
  sendPosition,
  signUpThunk,
  exitGame,
  setBullets,
  reloading,
  setShooting,
  resetShooting,
  toggleShot,
};
