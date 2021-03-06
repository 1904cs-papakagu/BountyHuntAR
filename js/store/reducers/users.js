import axios from 'axios';

const initState = {
  username: null,
  crosshairId: 0,
  score: 0
};

const SET_USER_ON_STATE = 'SET_USER_ON_STATE';
const HANDLE_ERROR = 'HANDLE_ERROR';
const SET_CROSSHAIR = 'SET_CROSSHAIR';
const UPDATE_SCORE = 'UPDATE_SCORE';

export const setCrosshair = crosshairId => {
  return {
    type: SET_CROSSHAIR,
    crosshairId
  };
};
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
  };
};

const updateScore = score => {
  return { type: UPDATE_SCORE, score };
};
export const updateScoreThunk = (userId, score) => {
  return async dispatch => {
    try {
      await axios({
        url: 'http://bountyhuntar.herokuapp.com/api/users/score',
        method: 'POST',
        data: { userId, score }
      });
      dispatch(updateScore(score));
    } catch (error) {
      dispatch(handleError(error));
    }
  };
};
export const loginThunk = (email, password) => {
  return async dispatch => {
    try {
      email = email.toLowerCase();
      const { data } = await axios({
        url: 'http://bountyhuntar.herokuapp.com/auth/login',
        method: 'POST',
        data: { email, password }
      });

      dispatch(setUserOnState(data));
    } catch (error) {
      dispatch(handleError(error));
    }
  };
};

export const signUpThunk = (email, password) => {
  return async dispatch => {
    try {
      email = email.toLowerCase();
      const { data } = await axios({
        url: 'http://bountyhuntar.herokuapp.com/auth/signup',
        method: 'POST',
        data: { email, password }
      });

      dispatch(setUserOnState(data));
    } catch (error) {
      dispatch(handleError(error));
    }
  };
};

export function user(state = initState, action) {
  switch (action.type) {
    case SET_USER_ON_STATE:
      return { ...state, ...action.user };
    case SET_CROSSHAIR:
      return { ...state, crosshairId: action.crosshairId };
    case UPDATE_SCORE:
      return { ...state, score: action.score };
    case HANDLE_ERROR:
      return { error: action.error };
    default:
      return state;
  }
}
