import socket from './socket';
import { endGame, updateAgent, spookTarget } from './reducers/game';

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
  socket.on('targetKilled', uid => {
    if (`${getState().user.id}` !== uid) {
      dispatch(endGame(false));
    }
  })
  socket.on('agentUpdate', (agentId, agentPosition) => {
    dispatch(updateAgent(agentId, agentPosition))
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
