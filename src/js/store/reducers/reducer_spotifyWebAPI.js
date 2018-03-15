let stateInit = {
    init: null,
    token: null,
    token_validated: false,
    attempt: false,
    isLoading: false
}

function reducer_spotifyWebAPI (state = stateInit, action) {
    switch (action.type) {
        case "SPOTIFY_INIT":
            state = {
                ...state,
                init: action.payload
            }
            return state;
        case "SPOTIFY_GET_TOKEN":
            state = {
                ...state,
                token: action.payload
            }
            return state;
        case "SPOTIFY_TOKEN_SUCCESS":
            state = {
                ...state,
                token_validated: true,
                attempt: true,
                isLoading: false
            }
            return state;
        case "SPOTIFY_TOKEN_FAILED":
            state = {
                ...state,
                token_validated: false,
                attempt: true,
                isLoading: false
            }
            return state;
        case "SPOTIFY_IS_LOADING":
            state = {
                ...state,
                isLoading: action.payload
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



export default reducer_spotifyWebAPI;
