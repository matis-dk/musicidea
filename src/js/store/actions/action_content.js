import { openNotification } from '../../utility/utility'

import * as spotifyWeb from '../../data/spotifyWeb';


export function getArtistData(id = "", method, type = "",  msg = "Sorry, vi arbejder på det", params = "") {
    return dispatch => {
        spotifyWeb.init[method](id, params)
            .then(res => {
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
