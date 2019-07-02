
const initState = {playing: false}

const START_PLAYING = "START_PLAYING"
const STOP_PLAYING = "STOP_PLAYING"

export const startGame = () => {return{type: START_PLAYING}}

export const endGame = () => {return{type: STOP_PLAYING}}

export default function(state = initState, action){
    switch(action.type){
        case START_PLAYING:
            return {playing: true}
        case STOP_PLAYING:
            return {playing: false}
        default:
            break;
    }
    return state;
}