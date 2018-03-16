let stateInit = {
    userName: "",
    userEmail: "",
    userBirthdate: "",
    userId: "",
    userSpotifyProfile: "",
    userCountry: "",
    userImages: [],
    userPlaylists: [],
    userFollowers: [],
    userTopArtists: [],
    playlist: []
}

function reducer_user (state = stateInit, action) {
    switch (action.type) {
        case "ADD_USER_DATA":
            state = {
                ...state,
                ...action.payload
            }
            return state;
        case "ADD_USER_TOP_ARTISTS":
            state = {
                ...state,
                userTopArtists: [...state.userTopArtists],
                userTopArtists: action.payload
            }
            return state;
        case "ADD_USER_PLAYLISTS":
            state = {
                ...state,
                userPlaylists: [...state.userPlaylists],
                userPlaylists: action.payload
            }
            return state;
        case "GET_PLAYLIST":
            state = {
                ...state,
                playlist: action.payload,
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



export default reducer_user;
