import * as spotifyWeb from '../../data/spotifyWeb';

//==================================================================

export function updatePlaybackState (state) {
    return {
        type: "PLAYBACK_STATE_UPDATE",
        payload: state
    }
}

export function playerPlay ( deviceID, uri ) {
            spotifyWeb.init.play( {
                "uris": [uri],
                "device_id": deviceID
            })

            return { type: "PLAYBACK_PLAYING" }
}

export function playerPause (deviceID) {

        spotifyWeb.init.pause({
            "device_id": deviceID
        })

        return  { type: "PLAYBACK_PAUSE" }
}

export function playerReorderQueue (queue) {
    return {
        type: "PLAYBACK_REORDERED_QUEUE",
        payload: queue
    }
}

export function playerAddTrackToQueue (item) {
    console.log(item)
    return {
        type: "PLAYBACK_ADD_TRACK",
        payload: {
            timestamp: (+ new Date()),
            content: (item.name || item.track.name),
            uri: (item.uri || item.track.uri)
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

export function playerSetVolume (device_id, volume) {
        spotifyWeb.init.setVolume(volume, { "device_id": device_id })
            .catch(err => {
                console.log("error in setVolume")
            })

        return {
            type: "PLAYBACK_SET_VOLUME",
            payload: volume
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
