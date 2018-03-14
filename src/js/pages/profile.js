import React from 'react';
import { Switch, withRouter, Route } from 'react-router'
import { connect } from 'react-redux';

class Profile extends React.Component {

    render () {

        return (
            <div>
                PROFILE
            </div>
        )
    }
}


export default connect(store => {return {store: store }}) (withRouter(Profile))
