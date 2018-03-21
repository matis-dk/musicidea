let stateInit = {
    playbackPlaying: false,
    playbackID: null,
    repeat: false,
    shuffle: false

}

function reducer_playback (state = stateInit, action) {
    switch (action.type) {
        case "PLAYBACK_TEST":
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
