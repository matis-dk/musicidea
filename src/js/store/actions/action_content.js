import { openNotification } from '../../utility/utility'


export function getPlaylist (spotifyAPI, history, playlistID, playlistOwner ) {
        return dispatch => {
            spotifyAPI.getPlaylist(playlistOwner, playlistID)
                .then(res => {
                    dispatch({
                        type: "GET_PLAYLIST",
                        payload: res
                    })
                })
                .catch (err => {
                    openNotification("Fejl", "Vi kunne ikke finde en playliste med følgende ID");
                    history.replace('/');
                })

        }
};


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
