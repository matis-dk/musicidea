let stateInit = {
    name: "Mathias",
    age: 25,
    country: "Denmark",
    post: 6700
}

function reducer_profile (state = stateInit, action) {
    switch (action.type) {
        case "CHANGE_NAME":
            console.log("CASE = CHANGE_NAME")
            state = {
                ...state
            }
            return state;

        case "CHANGE_AGE":
            console.log("CASE = CHANGE_AGE")
            state = {
                ...state
            }
            return state;
        default:
            console.log("CASE = DEFAULT")
            state = {
                ...state
            }
            return state;
    }

    return state;
}



export default reducer_profile;
