const initState = {
  status: '',
  agents: {},
  bullets: 7,
  reloading: false,
  shooting: false
};

const START_PLAYING = 'START_PLAYING';
const STOP_PLAYING = 'STOP_PLAYING';
const UPDATE_AGENT = 'UPDATE_AGENT';
const EXIT_GAME = 'EXIT_GAME';
const SET_BULLETS = 'SET_BULLETS';
const RELOADING = 'RELOADING';
const SET_SHOOTING = 'SET_SHOOTING';
const RESET_SHOOTING = 'RESET_SHOOTING';

export const exitGame = () => {
  return { type: EXIT_GAME };
};
export const updateAgent = (agentId, agentPosition) => {
  return { type: UPDATE_AGENT, agentId, agentPosition };
};
export const startGame = (locationId, userId, displacement) => {
  return { type: START_PLAYING, locationId, userId, displacement };
};
export const endGame = won => {
  return { type: STOP_PLAYING, won };
};
export const resetStatus = () => {
  return { type: EXIT_GAME };
};
export const setBullets = bullets => {
  return {
    type: SET_BULLETS,
    bullets
  };
};
export const reloading = status => {
  return {
    type: RELOADING,
    status
  };
};
export const setShooting = () => {
  return {
    type: SET_SHOOTING
  };
};
export const resetShooting = () => {
  return {
    type: RESET_SHOOTING
  };
};
export const spookTarget = () => {};

export default function(state = initState, action) {
  switch (action.type) {
    case START_PLAYING:
      return { ...state, status: 'playing' };
    case STOP_PLAYING:
      if (action.won) {
        return { ...state, status: 'won' };
      } else {
        return { ...state, status: 'lost' };
      }
    case EXIT_GAME:
      return initState;
    case UPDATE_AGENT:
      const { agentId, agentPosition } = action;
      state.agents[agentId] = agentPosition;
      console.log(state);
      return state;
    case SET_BULLETS:
      return { ...state, bullets: action.bullets };
    case RELOADING:
      return { ...state, reloading: action.status };
    case SET_SHOOTING:
      return { ...state, shooting: true };
    case RESET_SHOOTING:
      return { ...state, shooting: false };
    default:
      break;
  }
  return state;
}
