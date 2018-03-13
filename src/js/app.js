import React from 'react';
import { connect } from 'react-redux';

import * as spotifyWebAPI from './store/actions/action_spotifyWebAPI'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import  { Route, Redirect, Switch } from 'react-router-dom'

import Home from './pages/home.js'
import Signin from './pages/signin.js'

class App extends React.Component {

    componentWillMount() {
        // Initializing spotify object
        this.props.spotifyInit()

        // Extracting token from URL if it exist
        if ( this.props.location.hash ) {
            this.props.spotifyGetToken(this.props.location.hash);
        }
    }


    // Creating login URI
    getLoginUri () {
        const spotifyBase       = "https://accounts.spotify.com/authorize";
        const client_id         = "90dfc7083d684563888561ce310f940a";
        const redirect_uri      = "http://localhost:3000/";
        const response_type     = "token";

        return `${spotifyBase}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}`;
    }

    render () {

        // Validating token
        const store = this.props.store;
        if ( store.spotify.token && (store.spotify.attempt == false) ) {
            this.props.spotifyValidateToken(store.spotify.token)
        }

        return (
            <div>
                { this.props.store.spotify.token ?
                    <Home /> :
                    <Signin loginUri={this.getLoginUri()} />
                }
            </div>
        )
  }
}

function mapStateToProps (store) {
    return {
        store: store
    };
}


export default connect( mapStateToProps , { ...spotifyWebAPI } ) (App)
