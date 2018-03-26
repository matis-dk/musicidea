let stateInit = {
    current_state: null,
    playing: false,
    queue: [],
    repeat: false,
    shuffle: false,
    volume: 0
}

function reducer_playback (state = stateInit, action) {
    switch (action.type) {
        case "PLAYBACK_STATE_UPDATE":
            state = {
                ...state,
                playing: action.payload.paused,
                repeat: action.payload.repeat_mode,
                shuffle: action.payload.shuffle,        
                current_state: action.payload
            }
            return state;
        case "PLAYBACK_PLAYING":
            state = {
                ...state,
                playing: action.payload
            }
            return state;
        case "PLAYBACK_SET_SHUFFLE":
            state = {
                ...state
            }
            return state;
        case "PLAYBACK_SET_REPEAT":
            state = {
                ...state
            }
            return state;
        case "PLAYBACK_ADD_TRACK":
            state = {
                ...state,
                queue: [...state.queue, action.payload]
            }
            return state;
        case "PLAYBACK_REORDERED_QUEUE":
            state = {
                ...state,
                queue: [...action.payload]
            }
            return state;
        default:
            state = {
                ...state
            }
            return state;
    }

    return state;
}


export default reducer_playback;

//
//
// PLAYBACK_SET_VOLUME (S)
//
// USER_GET_DEVICES (S) ??
//
// PLAYBACK_PLAYING (S)
//
// PLAYBACK_CURRENT_STATE (S)
//
// PLAYBACK_SET_REPEAT (S)       CLIENT LOGIC
// PLAYBACK_SET_SHUFFLE (S)      CLIENT LOGIC
//
//
// PLAYBACK_NEXT_TRACK (A)       CLIENT LOGIC
// PLAYBACK_PREVIOUS_TRACK (A)   CLIENT LOGIC
//
// PLAYBACK_SET_POSITION   (A)
