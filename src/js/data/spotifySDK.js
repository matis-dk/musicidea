export let init = undefined;

export function initialize (token, updatePlaybackState, setDeviceID) {

    // Adding global init function
    window.onSpotifyWebPlaybackSDKReady = () => {
        init = new Spotify.Player({
          name: 'MusicIdea SDK Player',
          getOAuthToken: cb => { cb(token); }
        });

        // Error handling
        init.addListener('initialization_error', ({ message }) => { console.error(message); });
        init.addListener('authentication_error', ({ message }) => { console.error(message); });
        init.addListener('account_error', ({ message }) => { console.error(message); });
        init.addListener('playback_error', ({ message }) => { console.error(message); });

        // Playback status updates
        init.addListener('player_state_changed', state => { updatePlaybackState(state) });

        // Ready (console.log('Ready with Device ID', device_id) )
        init.addListener('ready', ({ device_id }) => { setDeviceID(device_id) });

        // Connect to the player!
        init.connect();
    };

    // Appending external Spotify Playback SDK
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    document.body.appendChild(script);
}
