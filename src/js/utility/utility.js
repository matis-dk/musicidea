import React from 'react'
import { Icon, notification } from 'antd';

//==================================================================
export function sortArrayOfObjects (a, b) {
    if (a.last_nom < b.last_nom)
      return -1;
    if (a.last_nom > b.last_nom)
      return 1;
    return 0;
}

//==================================================================

export function convertMsToMin (ms) {
    let minutes = Math.floor(ms / 60000).toString();
    let seconds = ((ms % 60000) / 1000).toFixed(0);

    if (minutes.length == 1) { minutes = "0" + minutes }

    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export function convertMusicNr (index) {
    index = index + 1;
    if ( index < 10 ) {
        return "0" + index
    }
    return index
}

//==================================================================

export function openNotification (msg = "Ukendt fejl", des = "Noget gik helt galt", icontype = "meh") {
    notification.config({
        placement: 'bottomLeft'
    });
    notification.open({
        message: msg,
        description: des,
        icon: <Icon type={icontype} style={{ color: '#108ee9' }} />,
    });
}

//==================================================================

export function initSpotifyPlaybackSDK (token, updatePlaybackState, getMyDevices) {

    // Adding global init function
    window.onSpotifyWebPlaybackSDKReady = () => {
      window.player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(token); }
      });

      // Error handling
      window.player.addListener('initialization_error', ({ message }) => { console.error(message); });
      window.player.addListener('authentication_error', ({ message }) => { console.error(message); });
      window.player.addListener('account_error', ({ message }) => { console.error(message); });
      window.player.addListener('playback_error', ({ message }) => { console.error(message); });

      // Playback status updates
      window.player.addListener('player_state_changed', state => {
          console.log(state.paused)
          updatePlaybackState(state)
      });

      // Ready
      window.player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
            //getMyDevices()
      });

      // Connect to the player!
      window.player.connect();
    };

    // Appending external Spotify Playback SDK
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    document.body.appendChild(script);
}
