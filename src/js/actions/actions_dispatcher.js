function mapDispatchToProps (dispatch) {
    return {
        actions: {
            notes: {
                addNote: () => dispatch(addNote()),
                removeNote: () => dispatch(removeNote()),
            },
            profile: {
                setName: () => dispatch(setName()),
                setAge: () => dispatch(setAge()),
                changeAge: () => dispatch(changeAge())
            }
        }
    }
}


export default mapDispatchToProps;



//============================== NOTES ====================================
function addNote (inputValues) {
    return {
        type: "ADD_NOTE",
        payload: inputValues
    }
};

function removeNote (notelistKey) {
    return {
        type: "REMOVE_NOTE",
        payload: notelistKey
    }
}


//============================== PROFILE ==================================

function setName (name = "Mathias") {
    return {
        type: 'SET_NAME',
        payload: name
    };
}

function setAge (age) {
    return {
        type: 'SET_AGE',
        payload: age
    };
}

function changeAge (age) {
    return {
        type: 'CHANGE_AGE',
        payload: age
    };
}
