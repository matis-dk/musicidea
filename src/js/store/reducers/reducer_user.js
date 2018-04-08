let stateInit = {
    userName: "",
    userEmail: "",
    userBirthdate: "",
    userId: "",
    userSpotifyProfile: "",
    userCountry: "",
    userImages: [],
    userDevices: {},
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
        case "ADD_USER_DEVICES":

            let devices = action.payload.reduce(function (total, device) {
                total[device.id] = device;
                return total
            }, {})

            state = {
                ...state,
                userDevices: devices
            }
            return state;
        case "ADD_USER_TOP_ARTISTS":
            state = {
                ...state,
                userTopArtists: action.payload
            }
            return state;
        case "ADD_USER_PLAYLISTS":
            state = {
                ...state,
                userPlaylists: action.payload
            }
            return state;
    }

    return state;
}



export default reducer_user;
