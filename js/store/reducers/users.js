import axios from 'axios'

const initState = {
  username: null
};

const SET_USER_ON_STATE = 'SET_USER_ON_STATE';

const setUserOnState = user => {
  return {
    type: SET_USER_ON_STATE,
    user
  };
};

export const loginThunk = () => {
  return async dispatch => {
    //dummy thunk
    //To-Do: connect to serve when implemented
    const user = { name: Cody };
    dispatch(setUserOnState(user))
  };
};

export function users(state = initState, action) {
  switch (action.type){
    case SET_USER_ON_STATE:
      return action.user
    default:
      return state
  }
}
