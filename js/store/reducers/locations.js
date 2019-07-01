import axios from 'axios';
import { classBody } from '@babel/types';
import console = require('console');

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
export const setInactiveThunk = locationID => {
  return async dispatch => {
    try {
      await axios({
        url: `http://bountyhuntar.herokuapp.com/api/locations/${locationID}`,
        method: 'PUT'
      });
      dispatch(setLocationOnState(initState));
    } catch (error) {
      console.error(error)
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

<<<<<<< HEAD
      if (data) {
        const [targetLatitude, targetLongitude] = data.GPS;
        dispatch(
          setLocationOnState({
            targetLatitude,
            targetLongitude,
            radius: data.radius
          })
        );
      } else {
        dispatch(setLocationOnState(initState));
=======
      // I COMMENTED OUT THE .forEach AND IMPLEMENTED A FOR LOOP SO I CAN BREAK OUT OF IT
      // AS SOON AS I FIND A MATCH (IN THEORY, THE ACTIVE KILL ZONES SHOULD NOT OVERLAP)

      // data.forEach(location => {
      //   const [targetLatitude, targetLongitude] = location.GPS;
      //   const [userLatitude, userLongitude] = currentLocation;
      //   const distance = Math.sqrt((targetLatitude - userLatitude)**2 + (targetLongitude - userLongitude)**2);
      //   if (distance <= location.radius) {
      //     dispatch(setLocationOnState({
      //       targetLatitude,
      //       targetLongitude,
      //       radius: location.radius,
      //     }));
      //   }
      // });

      for (let i = 0; i < data.length; i++) {
        const killzone = data[i];
        const [targetLatitude, targetLongitude] = killzone.GPS;
        const [userLatitude, userLongitude] = currentLocation;
        const distance = Math.sqrt((targetLatitude - userLatitude) ** 2 + (targetLongitude - userLongitude) ** 2);
        if (distance <= killzone.radius) {
          dispatch(setLocationOnState({
            targetLatitude,
            targetLongitude,
            radius: killzone.radius,
          }));
          break;    // stop analyzing the remaining kill zones once a match has been found
        }
>>>>>>> 224a1f5071ba8c632086aaa3b74c35bc37d4ab0d
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
