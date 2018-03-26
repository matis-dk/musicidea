import { openNotification } from '../../utility/utility'

//==================================================================

export function updatePlaybackState (state) {
    return {
        type: "PLAYBACK_STATE_UPDATE",
        payload: state
    }
}

export function playerPlay (spotifyAPI, track) {
        return (dispatch) => {



            let call = spotifyAPI.play( {
                "uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh"]
            } )

            call.then((res) => {dispatch ({ type: "PLAYBACK_PLAYING" })})
        }
}

export function playerPause (spotifyAPI, track) {

        spotifyAPI.pause()

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



export function playerSetRepeat (spotifyAPI, boolean) {
    return (dispatch) => {

        dispatch ({
            type: "PLAYBACK_SET_REPEAT",
            payload: boolean
       })

        spotifyAPI.setRepeat("track", {})
            .catch(err => {
                console.log("error in setRepeat")
            })
    }
}

export function playerSetShuffle (spotifyAPI, boolean) {
    return (dispatch) => {
        dispatch ({
            type: "PLAYBACK_SET_SHUFFLE",
            payload: boolean
       })

        spotifyAPI.setShuffle(boolean, {})
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
