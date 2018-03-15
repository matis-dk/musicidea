let stateInit = {
    userName: "",
    userId: "",
    userImages: [],
    userPlaylists: []
}

function reducer_user (state = stateInit, action) {
    switch (action.type) {
        case "GET_USER_PLAYLISTS":
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



export default reducer_user;
