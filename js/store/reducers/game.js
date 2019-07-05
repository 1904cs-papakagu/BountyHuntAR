
const initState = {status: ''}

const START_PLAYING = "START_PLAYING"
const STOP_PLAYING = "STOP_PLAYING"
const RESET = "RESET"

export const startGame = () => {return{type: START_PLAYING}}
export const endGame = (won) => {return{type: STOP_PLAYING, won}}
export const resetStatus = () => {return{type: RESET}}

export default function(state = initState, action){
    switch(action.type){
        case START_PLAYING:
            return {status: 'playing'}
        case STOP_PLAYING:
            if(action.won){
            return {status: 'won'}
            }
            return {status: 'lost'}
        case RESET:
            return {status: ''}
        default:
            break;
    }
    return state;
}