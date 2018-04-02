import { openNotification } from '../../utility/utility'

import * as spotifyWeb from '../../data/spotifyWeb';


export function getArtistData(id = "", method, type = "",  msg = "Sorry, vi arbejder på det", params = "") {
    return dispatch => {
        spotifyWeb.init[method](id, params)
            .then(res => {

                if ( method == "getPlaylist" ) {
                    res.tracks.items = res.tracks.items.map((item) => {
                        return { ...item, ...item.track  }
                    })
                }


                dispatch({
                    type,
                    payload: {
                        res,
                        id
                    }
                })


            })
            .catch (err => openNotification("Fejl", msg))
    }
}
