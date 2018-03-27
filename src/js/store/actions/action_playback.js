import { openNotification } from '../../utility/utility'

import * as spotifyWeb from '../../data/spotifyWeb';

//==================================================================

export function updatePlaybackState (state) {
    return {
        type: "PLAYBACK_STATE_UPDATE",
        payload: state
    }
}

export function playerPlay (track) {
        return (dispatch) => {



            let call = spotifyWeb.init.play( {
                "uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh"]
            } )

            call.then((res) => {dispatch ({ type: "PLAYBACK_PLAYING" })})
        }
}

export function playerPause (track) {

        spotifyWeb.init.pause()

        return  { type: "PLAYBACK_PAUSE" }
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



export function playerSetRepeat (boolean) {
    return (dispatch) => {

        dispatch ({
            type: "PLAYBACK_SET_REPEAT",
            payload: boolean
       })

        spotifyWeb.init.setRepeat("track", {})
            .catch(err => {
                console.log("error in setRepeat")
            })
    }
}

export function playerSetShuffle (boolean) {
    return (dispatch) => {
        dispatch ({
            type: "PLAYBACK_SET_SHUFFLE",
            payload: boolean
       })

        spotifyWeb.init.setShuffle(boolean, {})
            .catch(err => {
                console.log("error in setShuffle")
            })
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
