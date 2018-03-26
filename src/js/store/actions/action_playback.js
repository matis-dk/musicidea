import { openNotification } from '../../utility/utility'

//==================================================================

export function updatePlaybackState (state) {
    return {
        type: "PLAYBACK_STATE_UPDATE",
        payload: state
    }
}

export function playerPlay (spotifyAPI, track) {

        function handleResponse (failed, succeeded) {
            if (failed == null) {
                return {
                    type: "PLAYBACK_PLAYING",
                    payload: true
                }
            }
        }

        spotifyAPI.play(
            {"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh"]},
            handleResponse)
}


export function playerReorderQueue (queue) {
    return {
        type: "PLAYBACK_REORDERED_QUEUE",
        payload: queue
    }
}

export function playerAddTrackToQueue (item) {
    return {
        type: "PLAYBACK_ADD_TRACK",
        payload: {
            id: (item.id || item.track.id ),
            content: (item.name || item.track.name)
        }
    }
}

export function playerRemoveTrackFromQueue (item) {
    return {
        type: "PLAYBACK_REMOVE_TRACK",
        payload: (item.id || item.track.id )
    }
}



// next track
// previous track
// play / pause

// volume change
// playback position

// toggle repeat
// toggle shuffle

// create a new playlist
// rename playlist details
// delete playlist
// delete song
// reorder playlist tracks

// device selection
