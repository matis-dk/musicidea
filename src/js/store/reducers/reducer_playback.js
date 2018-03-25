let stateInit = {
    playback_current_state: null,
    playback_playing: false,
    playback_URIS: [],
    playback_repeat: false,
    playback_shuffle: false,
    playback_volume: 0
}

function reducer_playback (state = stateInit, action) {
    switch (action.type) {
        case "PLAYBACK_TEST":
            state = {
                ...state
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
        default:
            state = {
                ...state
            }
            return state;
    }

    return state;
}


export default reducer_playback;
