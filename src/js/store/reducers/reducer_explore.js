let stateInit = {
    search_result: {},
    search_query: ""
}


function reducer_playback (state = stateInit, action) {
    switch (action.type) {
        case "SEARCH_RESULT":
            state = {
                ...state,
                search_result: action.payload
            }
            return state;
        case "SEARCH_QUERY":
            state = {
                ...state,
                search_query: action.payload
            }
            return state;
    }

    return state;
}


export default reducer_playback;
