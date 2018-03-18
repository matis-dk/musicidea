let stateInit = {
    playlists: {},
    artists: {}
}

function reducer_content (state = stateInit, action) {
    switch (action.type) {
        case "GET_PLAYLIST":
            state = {
                ...state,
                playlists: {
                    ...state.playlists,
                    [action.payload.id]: action.payload
                }
            }
            return state;
        case "GET_ARTIST_ALBUMS":
            console.log(action.payload.artistID)
            state = {
                ...state,
                artists: {
                    ...state.artists,
                    [action.payload.artistID]: {
                        ...state.artists[action.payload.artistID],
                        items: action.payload.res.items
                    }
                }
            }
            return state;
        case "GET_ARTIST":
            state = {
                ...state,
                artists: {
                    ...state.artists,
                    [action.payload.artistID]: {
                        ...state.artists[action.payload.artistID],
                        ...action.payload.res
                    }
                }
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


export default reducer_content;
