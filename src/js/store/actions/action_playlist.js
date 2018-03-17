
export function getPlaylist (spotifyAPI, history, playlistID, playlistOwner, openNotification ) {
        return dispatch => {
            spotifyAPI.getPlaylist(playlistOwner, playlistID)
                .then(res => {
                    dispatch({
                        type: "GET_PLAYLIST",
                        payload: res
                    })
                })
                .catch (err => {
                    openNotification("Fejl", "Vi kunne ikke finde en kunster med følgende ID");
                    history.replace('/');
                })

        }
};
