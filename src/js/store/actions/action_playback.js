import * as spotifyWeb from '../../data/spotifyWeb';

import { openNotification, getTimestamp } from '../../utility/utility'

//==================================================================

export function updatePlaybackState (state) {
    return {
        type: "PLAYBACK_STATE_UPDATE",
        payload: state
    }
}

//==================================================================
// PLAYBACK
//==================================================================

export function playerPlayContext (deviceID, context_uri, offset = 0) {
        spotifyWeb.init.play( {
            "context_uri": context_uri,
            "device_id": deviceID,
            "offset": {"position": offset}
        } )

        return { type: "PLAYBACK_PLAYING" }
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


//==================================================================
// QUEUE
//==================================================================
export function playerReorderQueue (queue) {
    return {
        type: "PLAYBACK_REORDERED_QUEUE",
        payload: queue
    }
}

export function playerAddTrackToQueue ( item = {} ) {

    let temp = [{
        ...item,
        ...item.track,
        timestamp: getTimestamp()
    }]

    return {
        type: "PLAYBACK_ADD_TRACK",
        payload: temp
    }
}

export function playerAddPlaylistToQueue ( playlist = [] ) {
    let temp = playlist.map((item, index) => {
        return {
            ...item,
            timestamp: getTimestamp() + index
        }
    })

    return {
        type: "PLAYBACK_ADD_PLAYLIST",
        payload: temp
    }
}

export function playerRemoveTrackFromQueue (id, queue) {

    let temp = queue.filter((item) => {
        if (item.timestamp == id) { return false }
        return true
    })

    return {
        type: "PLAYBACK_REMOVE_TRACK",
        payload: temp
    }
}

export function playerDeleteQueue () {
    return {
        type: "PLAYBACK_DELETE_QUEUE"
    }
}


//==================================================================
// SETTINGS
//==================================================================

export function playerSetRepeat (boolean) {

        let repeat = (!boolean ? 'track' : 'off')

        spotifyWeb.init.setRepeat(repeat, {})
            .catch(err => {
                console.log("error in setRepeat")
            })

        return {
            type: "PLAYBACK_SET_REPEAT",
            payload: !boolean
        }
}

export function playerSetShuffle (boolean) {

        spotifyWeb.init.setShuffle(boolean, {})
            .catch(err => {
                console.log("error in setShuffle")
            })

        return {
            type: "PLAYBACK_SET_SHUFFLE",
            payload: boolean
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
