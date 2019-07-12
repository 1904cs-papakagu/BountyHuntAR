import socket from './socket';
import { endGame } from './reducers/game';

const loggingMiddleware = ({ dispatch, getState }) => {
  return next => action => {
    console.log(getState())
    console.log(next(action))
    console.log(getState())
  }
}

const thunkMiddleware = ({ dispatch, getState }) => {
  return next => action => {
    if (typeof action === 'function') {
      console.log('thunk in progress')
      return action(dispatch, getState)
    }
    return next(action)
  }
}

const socketMiddleware = ({ dispatch, getState }) => {
  socket.on('targetKilled', userId => {
    if (`${getState().user.id}` !== `${userId}`) {
      dispatch(endGame(false));
    }
  })
  socket.on('agentUpdate', (userId, transform) => {
    if (`${getState().user.id}` !== `${userId}`) {
      dispatch(updateAgent(userId, transform))
    }
  })
  socket.on('agentKilled', (userId) => {
    console.log('user:', userId)
    if (`${getState().user.id}` !== `${userId}`) {
      dispatch(killAgent(userId))
    } else {
      dispatch(endGame(false));
    }
  })
  return next => action => {
    return next(action);
  }
}

export {
  loggingMiddleware,
  thunkMiddleware,
  socketMiddleware,
}
