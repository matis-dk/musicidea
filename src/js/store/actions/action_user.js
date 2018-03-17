import axios from 'axios';

import { sortArrayOfObjects } from '../../utility/utility';

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
        }
};

export function getMyTopArtists (spotifyAPI) {
    return dispatch => {
        spotifyAPI.getMyTopArtists()
            .then(res => {
                console.log(sortArrayOfObjects)
                dispatch({
                    type: "ADD_USER_TOP_ARTISTS",
                    payload: res.items
                })
            })
            .catch (err => {
                console.log("FAILED - getMyTopArtists")
            })
    }
}

export function getUserPlaylists (spotifyAPI) {
    return dispatch => {
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
}
