import axios from 'axios'
import { classBody } from '@babel/types';

const initState = {
  username: null
};

const SET_USER_ON_STATE = 'SET_USER_ON_STATE';
const HANDLE_ERROR = 'HANDLE_ERROR'


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
