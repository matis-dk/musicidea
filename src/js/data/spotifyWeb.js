import Spotify from 'spotify-web-api-js';

export let init = undefined;

export function initialize (token) {
    init = new Spotify;
    init.setAccessToken(token)
}
