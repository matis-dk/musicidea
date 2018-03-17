
export function getPlaylist (spotifyAPI, playlistID) {
        return dispatch => {
            spotifyAPI.getPlaylist('mathiasp50', playlistID)
                .then(res => {
                    console.log(res)
                    dispatch({
                        type: "GET_PLAYLIST",
                        payload: res
                    })
                })
                .catch (err => {
                    console.log("FAILED - getPlaylist")
                })

        }
};
