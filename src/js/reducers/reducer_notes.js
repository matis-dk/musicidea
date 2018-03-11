let stateInit = {
    notes: [
        "Note1", "note2", "note3"
    ],
    notesID: "1919"
}

function reducer_notes (state = stateInit, action) {
    switch (action.type) {
        case "ADD_NOTE":
            console.log("CASE = ADD_NOTE")
            state = {
                ...state
            }
            return state;

        case "REMOVE_NOTE":
            console.log("CASE = REMOVE_NOTE")
            state = {
                ...state
            }
            return state;
    }

    return state;
}



export default reducer_notes;
