import axios from 'axios';

// DEFAULT STATE - tracks information re: your current kill zone, if any

const initState = {
  targetLatitude: null,
  targetLongitude: null,
  radius: null,
  id: null
};

// ACTION TYPES

const SET_LOCATION_ON_STATE = 'SET_LOCATION_ON_STATE';
const HANDLE_ERROR = 'HANDLE_ERROR';

// ACTION CREATORS

const setLocationOnState = location => {
  return {
    type: SET_LOCATION_ON_STATE,
    location
  };
};

const handleError = error => {
  return {
    type: HANDLE_ERROR,
    error
  };
};

// THUNKS
export const setInactiveThunk = (userId, killzoneId , userScore) => {
  return async dispatch => {
    try {
      await axios({
        url: 'http://bountyhuntar.herokuapp.com/api/locations/active',
        method: 'POST',
        data: {userId, killzoneId , userScore}
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getActiveLocationThunk = currentLocation => {
  return async dispatch => {
    try {
      const { data } = await axios({
        url: 'http://bountyhuntar.herokuapp.com/api/locations/active',
        method: 'PUT',
        data: { userLocation: currentLocation }
      });

      if (data) {
        const [targetLatitude, targetLongitude] = data.GPS
        dispatch(
          setLocationOnState({
            id: data.id,
            targetLatitude,
            targetLongitude,
            radius: data.radius
          })
        );
      } else {
        dispatch(setLocationOnState(initState));
      }
    } catch (error) {
      dispatch(handleError(error));
    }
  };
};

// REDUCER

export function location(state = initState, action) {
  switch (action.type) {
    case SET_LOCATION_ON_STATE:
      return action.location;
    case HANDLE_ERROR:
      return { error: action.error };
    default:
      return state;
  }
}
