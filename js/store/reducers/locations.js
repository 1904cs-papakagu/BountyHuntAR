import axios from 'axios';

import { joinRoom, killTarget } from '../../store/socket';

const initState = {
  targetLatitude: null,
  targetLongitude: null,
  radius: null,
  id: null,
  locations: []
};

const SET_LOCATION_ON_STATE = 'SET_LOCATION_ON_STATE';
const STOP_PLAYING = 'STOP_PLAYING';
const ACTIVE_LOCATIONS = 'ACTIVE_LOCATIONS';
const HANDLE_ERROR = 'HANDLE_ERROR';
const START_PLAYING = 'START_PLAYING';


const setActiveLocations = locations => {
  return {
    type: ACTIVE_LOCATIONS,
    locations
  };
};
const handleError = error => {
  return {
    type: HANDLE_ERROR,
    error
  };
};


export const setInactiveThunk = ( locationId, userId, userScore) => {
  return async () => {
    try {
      await axios({
        url: 'http://bountyhuntar.herokuapp.com/api/locations/active',
        method: 'POST',
        data: { locationId, userId, userScore }
      });
      killTarget(locationId, userId);
    } catch (error) {
      console.error(error);
    }
  };
};
export const getAllActiveLocationThunk = () => {
  return async dispatch => {
    try {
      const { data } = await axios({
        url: 'http://bountyhuntar.herokuapp.com/api/locations/active',
        method: 'GET'
      });
      dispatch(setActiveLocations(data));
    } catch (error) {
      dispatch(handleError(error));
    }
  };
};


export function location(state = initState, action) {
  switch (action.type) {
    case START_PLAYING:
      const { locationId, userId, displacement } = action;
      const data = state.locations.filter(loc => loc.id === locationId)[0];
      const [targetLatitude, targetLongitude] = data.GPS;
      joinRoom(locationId, userId, displacement);
      return {
        ...state,
        id: data.id,
        targetLatitude,
        targetLongitude,
        radius: data.radius
      };
    case SET_LOCATION_ON_STATE:
      return { ...state, ...action.location };
    case STOP_PLAYING:
      return { ...initState, locations: state.locations };
    case HANDLE_ERROR:
      return { error: action.error };
    case ACTIVE_LOCATIONS:
      return { ...state, locations: action.locations };
    default:
      return state;
  }
}
