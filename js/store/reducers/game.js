const initState = {
  status: '',
  bullets: 7,
  reloading: false,
  shooting: false,
  canShoot: true,
  loading: true,
  agents: {},
};

const START_PLAYING = 'START_PLAYING';
const STOP_PLAYING = 'STOP_PLAYING';
const EXIT_GAME = 'EXIT_GAME';
const SET_BULLETS = 'SET_BULLETS';
const RELOADING = 'RELOADING';
const SET_SHOOTING = 'SET_SHOOTING';
const RESET_SHOOTING = 'RESET_SHOOTING';
const TOGGLE_SHOT = 'TOGGLE_SHOT';
const LOADING = 'LOADING';
const UPDATE_AGENT = 'UPDATE_AGENT'
const KILL_AGENT = 'KILL_AGENT'

export const exitGame = () => {
  return { type: EXIT_GAME };
};
export const setLoading = loading => {
  return { type: LOADING, loading };
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
export const toggleShot = () => {
  return {
    type: TOGGLE_SHOT
  };
};

export default function (state = initState, action) {
  switch (action.type) {
    case START_PLAYING:
      return { ...state, status: 'playing' };
    case STOP_PLAYING:
      if (action.won) {
        return { ...state, status: 'won', loading: true};
      } else {
        return { ...state, status: 'lost', loading: true };
      }
    case EXIT_GAME:
      return initState;
    case SET_BULLETS:
      return { ...state, bullets: action.bullets };
    case RELOADING:
      return { ...state, reloading: action.status };
    case SET_SHOOTING:
      return { ...state, shooting: true };
    case RESET_SHOOTING:
      return { ...state, shooting: false };
    case TOGGLE_SHOT:
      return { ...state, canShoot: !state.canShoot };
    case LOADING:
      return { ...state, loading: action.loading };
    case UPDATE_AGENT:
      const agents = { ...state.agents }
      if (agents[action.agentId]) {
        agents[action.agentId] = { ...agents[action.agentId], transform: action.transform }
      } else {
        agents[action.agentId] = { id: action.agentId, displacement: action.transform, transform: [0, 0, 0] }
      }
      return { ...state, agents }
    case KILL_AGENT:
      const newAgents = { ...state.agents }
      delete newAgents[action.agentId]
      return { ...state, agents: newAgents }
    default:
      break;
  }
  return state;
}
