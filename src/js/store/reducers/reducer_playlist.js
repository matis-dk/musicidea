let stateInit = {

}

function reducer_playlist (state = stateInit, action) {
    switch (action.type) {
        case "GET_PLAYLIST":
            state = {
                ...state,
                [action.payload.id]: action.payload
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


export default reducer_playlist;
