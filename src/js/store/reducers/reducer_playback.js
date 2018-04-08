let stateInit = {
    current_state: null,
    playing: false,
    queue: [],
    repeat: false,
    shuffle: false,
    volume: 30,
    currentContext: false,
    currentTrack: ""
}


function reducer_playback (state = stateInit, action) {
    switch (action.type) {
        case "PLAYBACK_STATE_UPDATE":
            state = {
                ...state,
                playing: !action.payload.paused,
                //repeat: ( ( action.payload.repeat_mode > 0 ) ? true : false ),      // disabled temp because of buggy server respond
                shuffle: action.payload.shuffle,
                current_state: action.payload
            }
            return state;
        case "PLAYBACK_PLAYING":
            state = {
                ...state,
                playing: true,
                currentContext: action.payload.currentContext,
                currentTrack: action.payload.currentTrack
            }
            return state;
        case "PLAYBACK_PAUSE":
            state = {
                ...state,
                playing: false
            }
            return state;
        case "PLAYBACK_NEXT_TRACK":
            state = {
                ...state
            }
            return state;
        case "PLAYBACK_PREV_TRACK":
            state = {
                ...state
            }
            return state;
        case "PLAYBACK_SET_POSITION":
            state = {
                ...state,
                current_state: {
                    ...state.current_state,
                    position: action.payload
                }
            }
            return state;
        case "PLAYBACK_SET_REPEAT":
            state = {
                ...state,
                repeat: action.payload
            }
            return state;
        case "PLAYBACK_SET_SHUFFLE":
            state = {
                ...state,
                shuffle: action.payload
            }
            return state;
        case "PLAYBACK_ADD_TRACK":
            state = {
                ...state,
                queue: [...state.queue, ...action.payload]
            }
            return state;
        case "PLAYBACK_ADD_PLAYLIST":
            state = {
                ...state,
                queue: [...state.queue, ...action.payload],
            }
            return state;
        case "PLAYBACK_REORDERED_QUEUE":
            state = {
                ...state,
                queue: [...action.payload]
            }
            return state;
        case "PLAYBACK_REMOVE_TRACK":
            state = {
                ...state,
                queue: action.payload
            }
            return state;
        case "PLAYBACK_DELETE_QUEUE":
            state = {
                ...state,
                queue: []
            }
            return state;
        case "PLAYBACK_SET_VOLUME":
            state = {
                ...state,
                volume: action.payload
            }
            return state;
    }

    return state;
}


export default reducer_playback;
