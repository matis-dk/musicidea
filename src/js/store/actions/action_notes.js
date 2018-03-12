import axios from 'axios';


//============================== NOTES ====================================
export function addNote () {
    return {
        type: "ADD_NOTE",
        payload: 1
    }
};

export function removeNote (notelistKey) {
    return {
        type: "REMOVE_NOTE",
        payload: notelistKey
    }
}


export function getNote (notelistKey) {
    return dispatch => {
      axios.get('http://uinames.com/api/')
          .then((res) => {
              dispatch({
                  type: 'REMOVE_NOTE',
                  payload: res.data
              })
          })
    };
}

function increment() {
  return {
    type: "REMOVE_NOTE"
  };
}

//============================== PROFILE ==================================

export function setName (name = "Mathias") {
    return {
        type: 'SET_NAME',
        payload: name
    };
}

export function setAge (age) {
    return {
        type: 'SET_AGE',
        payload: age
    };
}

export function changeAge (age) {
    return {
        type: 'CHANGE_AGE',
        payload: age
    };
}
