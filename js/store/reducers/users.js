import axios from 'axios'
import { classBody } from '@babel/types';

// DEFAULT STATE

const initState = {
  username: null
};

// ACTION TYPES

const SET_USER_ON_STATE = 'SET_USER_ON_STATE';
const HANDLE_ERROR = 'HANDLE_ERROR'

// ACTION CREATORS

const setUserOnState = user => {
  return {
    type: SET_USER_ON_STATE,
    user
  };
};

const handleError = error => {
  return {
    type: HANDLE_ERROR,
    error
  }
}

// THUNKS

export const loginThunk = (email, password) => {
  return async dispatch => {
    try {
    const {data} = await axios({
      url: 'http://bountyhuntar.herokuapp.com/auth/login',
      method: 'POST',
      data: {email, password}
    })
    // const data = {name: 'Cody'}
    dispatch(setUserOnState(data))
    }
    catch (error) {
      dispatch(handleError(error))
    }
  }
}

// REDUCER

export function user(state = initState, action) {
  switch (action.type){
    case SET_USER_ON_STATE:
      return action.user
    case HANDLE_ERROR:
      return {error: action.error}
    default:
      return state
  }
}
