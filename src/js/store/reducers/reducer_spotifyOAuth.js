let stateInit = {
    token: null,
    token_validated: false,
    isLoading: false,
    loginAllowed: false,
    device_id: null
}

function reducer_spotifyOAuth (state = stateInit, action) {
    switch (action.type) {
        case "SPOTIFY_SET_URL_TOKEN":
            state = {
                ...state,
                token: action.payload
            }
            return state;
        case "SPOTIFY_SET_LOCALSTORAGE_TOKEN":
            state = {
                ...state,
                token: window.localStorage.getItem('token')
            }
            return state;
        case "SPOTIFY_TOKEN_SUCCESS":
            window.localStorage.setItem('token', state.token);
            state = {
                ...state,
                token_validated: true,
                isLoading: false
            }
            return state;
        case "SPOTIFY_TOKEN_FAILED":
            window.localStorage.removeItem('token');
            state = {
                ...state,
                token_validated: false,
                isLoading: false,
                loginAllowed: false
            }
            return state;
        case "SPOTIFY_IS_LOADING":
            state = {
                ...state,
                isLoading: action.payload
            }
            return state;
        case "SPOTIFY_SET_DEVICE_ID":
            state = {
                ...state,
                device_id: action.payload
            }
            return state;
        case "MUSICIDEA_LOGIN_ALLOWED":
            state = {
                ...state,
                loginAllowed: true
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
