import axios from 'axios';

import { openNotification} from '../../utility/utility'

import * as spotifyWeb from '../../data/spotifyWeb';
import * as spotifySDK from '../../data/spotifySDK';

//==================================================================

export function spotifySetTokenFromURL(url) {
    return {
        type: "SPOTIFY_SET_URL_TOKEN",
        payload: url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1]
    }
};

export function spotifySetTokenFromLocalStorage(url) {
    return {
        type: "SPOTIFY_SET_LOCALSTORAGE_TOKEN"
    }
};

export function spotifyValidateToken(token, updatePlaybackState) {

    return dispatch => {

        dispatch({
            type: "SPOTIFY_IS_LOADING",
            payload: true
        })

        axios({
            method: 'get',
            url: "https://api.spotify.com/v1/me",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res) => {

            // Initializing spotify web api and playback sdk
            spotifyWeb.initialize(token);
            spotifySDK.initialize(token, updatePlaybackState, setDeviceID)

            dispatch({
                type: 'SPOTIFY_TOKEN_SUCCESS'
            });

            dispatch({
                type: "MUSICIDEA_LOGIN_ALLOWED"
            })

            function setDeviceID (deviceID) {
                dispatch({
                    type: "SPOTIFY_SET_DEVICE_ID",
                    payload: deviceID
                })
            }

            openNotification("Login succesfuld", "Du har nu logget ind med din spotify account", "smile")

        })
        .catch((err) => {
            dispatch({
                type: 'SPOTIFY_TOKEN_FAILED'
            })

            openNotification("Login fejlede", "Vi kunne ikke logge ind på din spotify account", "frown")

        })
    };
};
