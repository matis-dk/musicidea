import { openNotification } from '../../utility/utility'

export function getArtistData(spotifyAPI, id = "", method, type = "",  msg = "Sorry, vi arbejder på det", params = "") {
    return dispatch => {
        spotifyAPI[method](id, params)
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
