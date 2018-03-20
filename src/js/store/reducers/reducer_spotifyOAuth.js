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
        case "SPOTIFY_SET_VALIDATED_TOKEN":
            state = {
                ...state
            }
            state.init.setAccessToken(state.token);
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
        case "MUSICIDEA_LOGIN_ALLOWED":
            state = {
                ...state,
                loginAllowed: true
            }
        default:
            state = {
                ...state
            }
            return state;
    }

    return state;
}



export default reducer_spotifyOAuth;
