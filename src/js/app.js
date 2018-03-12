import React from 'react';
import { connect } from 'react-redux';

import { addNote, removeNote, getNote } from './store/actions/action_notes';

class App extends React.Component {
    render () {

    return (
        <div>
            <h1 onClick={() => { this.props.getNote() }}> APP </h1>
        </div>
    );
  }
}


export default connect( store => store , { addNote, removeNote, getNote } ) (App)
