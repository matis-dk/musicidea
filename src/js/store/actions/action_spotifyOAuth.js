import axios from 'axios';

import Spotify from 'spotify-web-api-js';

import { openNotification } from '../../utility/utility'


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

export function spotifyValidateToken(token) {
    const spotifyValidationUrl = "https://api.spotify.com/v1/me";

    return dispatch => {

        dispatch({
            type: "SPOTIFY_IS_LOADING",
            payload: true
        })

        axios({
            method: 'get',
            url: spotifyValidationUrl,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res) => {
            openNotification("Login succesfuld", "Du har nu logget ind med din spotify account", "smile")

            dispatch({
                type: 'SPOTIFY_TOKEN_SUCCESS'
            });

            dispatch({
                type: "SPOTIFY_INIT",
                payload: new Spotify()
            })

            dispatch({
                type: "SPOTIFY_SET_VALIDATED_TOKEN"
            })

            dispatch({
                type: "MUSICIDEA_LOGIN_ALLOWED"
            })

        })
        .catch((err) => {
            openNotification("Login fejlede", "Vi kunne ikke logge ind på din spotify account", "frown")

            dispatch({
                type: 'SPOTIFY_TOKEN_FAILED'
            })
        })
    };
};
