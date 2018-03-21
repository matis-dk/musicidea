import { openNotification } from '../../utility/utility'

function myCallback(obj) {
    console.log(arguments)
}

export function playerPlay (spotifyAPI) {
    console.log("PLAYER CALLED")
    
    return dispatch => {
        spotifyAPI.play({"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"]}, myCallback)
            .then(res => {

                console.log("PLAYER RESPONDED")

                // dispatch({
                //     type,
                //     payload: {
                //         res,
                //         id
                //     }
                // })

            })
            .catch (err => openNotification("Fejl", msg))
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
