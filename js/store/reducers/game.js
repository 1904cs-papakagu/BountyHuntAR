const initState = {status: '', agents: {}}

const START_PLAYING = "START_PLAYING"
const STOP_PLAYING = "STOP_PLAYING"
const UPDATE_AGENT = 'UPDATE_AGENT'

export const updateAgent = (agentId,agentPosition) => {return{type:UPDATE_AGENT, agentId, agentPosition}}
export const startGame = (locationId,userId,displacement) => {return{type: START_PLAYING, locationId, userId ,displacement}}
export const endGame = (won) => {return{type: STOP_PLAYING, won}}
export const spookTarget = () => {}


export default function(state = initState, action){
    switch(action.type){
        case START_PLAYING:
            return {...state, status: 'playing'}
        case STOP_PLAYING:
            if(action.won){
            return {...state, status: 'won'}
            } else {
             return {...state, status: 'lost'}
            }
        case UPDATE_AGENT:
            const {agentId, agentPosition} = action
            state.agents[agentId] = agentPosition
            console.log(state)

            return state
        default:
            break;
    }
    return state;
}