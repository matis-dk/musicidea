import axios from 'axios';
import Spotify from 'spotify-web-api-js';


//==================================================================


export function spotifyInit () {
    return {
        type: "SPOTIFY_INIT",
        payload: new Spotify()
    }
};


export function spotifyGetToken(url) {
    return {
        type: "SPOTIFY_GET_TOKEN",
        payload: url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1]
    }
};


export function spotifyValidateToken(token) {
    const spotifyValidationUrl = "https://api.spotify.com/v1/me";
    return dispatch => {
        axios({
            method: 'get',
            url: spotifyValidationUrl,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res) => {
            dispatch({
                type: 'SPOTIFY_TOKEN_SUCCESS',
                payload: res.data
            })

            dispatch({
                type: "SPOTIFY_SET_TOKEN"
            })
        })
        .catch((err) => {
            dispatch({
                type: 'SPOTIFY_TOKEN_FAILED'
            })
        })
    };
};
