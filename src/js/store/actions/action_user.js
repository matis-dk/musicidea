import { openNotification, sortArrayOfObjects } from '../../utility/utility'
import * as spotifyWeb from '../../data/spotifyWeb';

export function getDataInit () {
        return dispatch => {

            spotifyWeb.init.getMe()
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
                    openNotification("Fejl", "Vi kunne ikke hente dine bruger oplysninger", "frown")
                })
        }
};

export function getMyDevices () {
    return dispatch => {

        spotifyWeb.init.getMyDevices()
            .then(res => {
                dispatch({
                    type: "ADD_USER_DEVICES",
                    payload: res.devices
                })
            })
            .catch (err => {
                openNotification("Fejl", "Vi kunne ikke hente dine afspilningsenheder", "frown")
            })
    }
}

export function getMyTopArtists () {
    return dispatch => {
        spotifyWeb.init.getMyTopArtists()
            .then(res => {

                dispatch({
                    type: "ADD_USER_TOP_ARTISTS",
                    payload: sortArrayOfObjects(res.items, "popularity")
                })
            })
            .catch (err => {
                openNotification("Fejl", "Vi kunne ikke hente dine mest populære kunstere", "frown")
            })
    }
}

export function getUserPlaylists () {
    return dispatch => {
        spotifyWeb.init.getUserPlaylists()
            .then(res => {
                dispatch({
                    type: "ADD_USER_PLAYLISTS",
                    payload: res.items
                })
            })
            .catch (err => {
                openNotification("Fejl", "Vi kunne ikke hente din playliste", "frown")
            })
    }
}
