let stateInit = {
    playlists: {},
    albums: {},
    artists: {}
}

function reducer_content (state = stateInit, action) {
    switch (action.type) {
        case "GET_PLAYLIST":
            state = {
                ...state,
                playlists: {
                    ...state.playlists,
                    [action.payload.res.id]: action.payload.res
                }
            }
            return state;
        case "GET_ALBUM":
            state = {
                ...state,
                albums: {
                    ...state.albums,
                    [action.payload.res.id]: action.payload.res
                }
            }
            return state;
        case "GET_ARTIST":
            state = {
                ...state,
                artists: {
                    ...state.artists,
                    [action.payload.id]: {
                        ...state.artists[action.payload.id],
                        ...action.payload.res
                    }
                }
            }
            return state;
        case "GET_ARTIST_ALBUMS":
            state = {
                ...state,
                artists: {
                    ...state.artists,
                    [action.payload.id]: {
                        ...state.artists[action.payload.id],
                        albums: action.payload.res.items
                    }
                }
            }
            return state;
        case "GET_ARTIST_RELATED_ARTISTS":
            state = {
                ...state,
                artists: {
                    ...state.artists,
                    [action.payload.id]: {
                        ...state.artists[action.payload.id],
                        relatedArtists: action.payload.res.artists
                    }
                }
            }
            return state;
        case "GET_ARTIST_TOP_TRACKS":
            state = {
                ...state,
                artists: {
                    ...state.artists,
                    [action.payload.id]: {
                        ...state.artists[action.payload.id],
                        topTracks: action.payload.res.tracks
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
