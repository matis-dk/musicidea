import * as spotifyWeb from '../../data/spotifyWeb';

import { openNotification, getTimestamp, handleSkipping } from '../../utility/utility'

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

export function playerPlayContext (deviceID, context_uri, offset = 0, currentContext = false) {
        spotifyWeb.init.play( {
            "context_uri": context_uri,
            "device_id": deviceID,
            "offset": {"position": offset}
        } )

        return {
            type: "PLAYBACK_PLAYING",
            payload: {
                currentContext: currentContext,
                currentTrack: ""
            }
        }
}

export function playerPlay ( deviceID, uri, currentContext = false, currentTrack = "" ) {
        spotifyWeb.init.play( {
            "uris": [uri],
            "device_id": deviceID
        })

        return {
            type: "PLAYBACK_PLAYING",
            payload: {
                currentContext: currentContext,
                currentTrack: currentTrack
            }
        }
}

export function playerResume ( deviceID ) {  // NOBODY USING IT ?
        spotifyWeb.init.play( {
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

export function playerSetPosition (position, device_id) {
    spotifyWeb.init.seek( position, { "device_id": device_id } )

    return {
        type: "PLAYBACK_SET_POSITION",
        payload: position
    }
}


export function playerSkip (method, deviceID, playback) {

    let { currentContext, queue } = playback;

    if ( currentContext == "queue" ) {
        let i = handleSkipping(playback, method)

        return playerPlay (deviceID, queue[i].uri, currentContext, queue[i].timestamp);
    }

    if ( currentContext == "playlist" ) {
        spotifyWeb.init[method]({
            "device_id": deviceID
        })
        return  { type: "PLAYBACK_NEXT_TRACK" };
    }
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

export function playerSaveQueue (userId, queueName, tracks) {

        function handleError() {
             openNotification("Fejl", "Vi kunne ikke gemme din spilleliste", "frown");
        }

        return (dispatch) => {

            spotifyWeb.init.createPlaylist( userId, { "name": queueName } ).then(res => {

                spotifyWeb.init.addTracksToPlaylist(userId, res.id, tracks).then(res => {

                    spotifyWeb.init.getUserPlaylists().then(res => {
                        openNotification("Spilleliste gemt", "Din spilleliste er nu gemt i Spotify", "smile")

                        dispatch({
                            type: "ADD_USER_PLAYLISTS",
                            payload: res.items
                        })

                    }).catch((err) => handleError() )
                }).catch((err) => handleError() )
            }).catch((err) => handleError() )

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
