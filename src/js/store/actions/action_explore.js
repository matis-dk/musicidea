import * as spotifyWeb from '../../data/spotifyWeb';

import { openNotification } from '../../utility/utility'

export function searchQuery (query = "", types = []) {
        return dispatch => {

            dispatch({
                type: "SEARCH_QUERY",
                payload: query
            })

            spotifyWeb.init.search(query, types)
                .then(res => {
                    dispatch({
                        type: "SEARCH_RESULT",
                        payload: res
                    })
                })
                .catch (err => {
                    openNotification("Fejl", "Der skete en fejl ved søgning efter dette søgeord", "frown")
                })

        }
};
