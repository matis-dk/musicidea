import axios from 'axios';


export function getDataInit (spotifyAPI) {

        return dispatch => {

            spotifyAPI.getUserPlaylists().
                then((res) => {
                    console.log(res)
                })
        }

        return {
            type: "GET_USER_PLAYLISTS",
            payload: "YA"
        }
};
