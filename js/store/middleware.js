import socket from './socket';
import {endGame} from './reducers/game';

const loggingMiddleware = ({dispatch, getState}) => {
  return next => action => {
    console.log(getState())
    console.log(next(action))
    console.log(getState())
  }
}

const thunkMiddleware = ({dispatch, getState}) => {
  return next => action => {
    if (typeof action === 'function') {
      console.log('thunk in progress')
      return action(dispatch, getState)
    }
    return next(action)
  }
}

const socketMiddleware = ({dispatch}) => {
  socket.on('targetKilled', () => {
    console.log('SOCKET GOT TARGETKILLED');
    dispatch(endGame());
  });
  return next => action => {
    next(action);
  }
}

export {
  loggingMiddleware,
  thunkMiddleware,
  socketMiddleware,
}
