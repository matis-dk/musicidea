let stateInit = {
    init: null,
    token: null,
    token_validated: false,
    isLoading: false,
    loginAllowed: false
}

function reducer_spotifyOAuth (state = stateInit, action) {
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
        case "SPOTIFY_SET_TOKEN":
            state = {
                ...state
            }
            state.init.setAccessToken(state.token);
            return state;
        case "SPOTIFY_TOKEN_SUCCESS":
            state = {
                ...state,
                token_validated: true,
                isLoading: false
            }
            return state;
        case "SPOTIFY_TOKEN_FAILED":
            state = {
                ...state,
                token_validated: false,
                isLoading: false
            }
            return state;
        case "SPOTIFY_IS_LOADING":
            state = {
                ...state,
                isLoading: action.payload
            }
            return state;
        case "MUSICIDEA_LOGIN":
            state = {
                ...state,
                loginAllowed: action.payload
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



export default reducer_spotifyOAuth;
