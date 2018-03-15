import axios from 'axios';
import Spotify from 'spotify-web-api-js';


//==================================================================

export function spotifyGetToken(url) {
    return {
        type: "SPOTIFY_GET_TOKEN",
        payload: url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1]
    }
};


export function spotifyValidateToken(token, openNotification) {
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
                type: 'SPOTIFY_TOKEN_SUCCESS',
                payload: res.data,
            });

            dispatch({
                type: "SPOTIFY_INIT",
                payload: new Spotify()
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
