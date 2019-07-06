
const initState = {state: 'not playing', agents: {}}

const START_PLAYING = "START_PLAYING"
const STOP_PLAYING = "STOP_PLAYING"
const UPDATE_AGENT = 'UPDATE_AGENT'

export const updateAgent = (agentId,agentTransform) => {return{type:UPDATE_AGENT, agentId, agentTransform}}
export const startGame = () => {return{type: START_PLAYING}}
export const endGame = (won) => {return{type: STOP_PLAYING, won}}

export default function(state = initState, action){
    switch(action.type){
        case START_PLAYING:
            return {state: 'playing'}
        case STOP_PLAYING:
            if(won){
            return {state: 'won'}
            } else {
             return {state: 'lost'}
            }
        case UPDATE_AGENT:
            state.agents[agentId] = agentTransform
            return state
        default:
            break;
    }
    return state;
}