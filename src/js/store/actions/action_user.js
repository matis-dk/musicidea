import axios from 'axios';


export function getDataInit (spotifyAPI) {
        return dispatch => {

            spotifyAPI.getMe()
                .then(res => {
                    dispatch({
                        type: "ADD_USER_DATA",
                        payload: {
                            userName: res.id,
                            userEmail: res.email,
                            userBirthdate: res.birthdate,
                            userId: res.id,
                            userSpotifyProfile: res.href,
                            userCountry: res.country,
                            userImages: res.images,
                            userFollowers: res.followers
                        }
                    })
                })
                .catch (err => {
                    console.log("FAILED - getMe")
                })

            spotifyAPI.getMyTopArtists()
                .then(res => {
                    dispatch({
                        type: "ADD_USER_TOP_ARTISTS",
                        payload: res.items
                    })
                })
                .catch (err => {
                    console.log("FAILED - getMyTopArtists")
                })

            spotifyAPI.getUserPlaylists()
                .then(res => {
                    dispatch({
                        type: "ADD_USER_PLAYLISTS",
                        payload: res.items
                    })
                })
                .catch (err => {
                    console.log("FAILED - getUserPlaylists")
                })

        }
};
