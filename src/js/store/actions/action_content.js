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


export function getArtistAlbums (spotifyAPI, history, artistID) {
        return dispatch => {
            spotifyAPI.getArtistAlbums(artistID)
                .then(res => {
                    dispatch({
                        type: "GET_ARTIST_ALBUMS",
                        payload: {
                            res,
                            artistID
                        }
                    })
                })
                .catch (err => {
                    openNotification("Fejl", "Vi kunne ikke finde en kunster med følgende ID");
                    history.replace('/');
                })
        }
};

export function getArtist (spotifyAPI, history, artistID) {
        return dispatch => {
            spotifyAPI.getArtist(artistID)
                .then(res => {
                    dispatch({
                        type: "GET_ARTIST",
                        payload: {
                            res,
                            artistID
                        }
                    })
                })
                .catch (err => {
                    openNotification("Fejl", "Vi kunne ikke finde en kunster med følgende ID");
                    history.replace('/');
                })
        }
};
