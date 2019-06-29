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

export const loginThunk = (email, password) => {
  return async dispatch => {
    try {
          const {data} = await axios({
      url: 'bountyhuntar.herokuapp.com/auth/login',
      method: 'POST',
      data: {email, password}
    })
    dispatch(setUserOnState(data))
    }
    catch (error) {
      console.error(error)
    }
  }
}

export function user(state = initState, action) {
  switch (action.type){
    case SET_USER_ON_STATE:
      return action.user
    default:
      return state
  }
}
