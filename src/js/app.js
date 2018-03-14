import React from 'react';
import { connect } from 'react-redux';

import * as spotifyWebAPI from './store/actions/action_spotifyWebAPI'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import  { Route, Redirect, Switch } from 'react-router-dom'

import Home from './pages/home'
import Signin from './pages/signin'
import Profile from './pages/profile'
import Header from './components/layout/header'


//==================================================================

class App extends React.Component {

    componentWillMount() {
        // Initializing spotify object
        this.props.spotifyInit()

        // Extracting token from URL if it exist
        if ( this.props.location.hash ) {
            this.props.spotifyGetToken(this.props.location.hash);
            this.props.history.replace('/')
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
        if ( store.spotify.token && (store.spotify.attempt == false) ) {        //  <-- add tooltip if failed attempt
            this.props.spotifyValidateToken(store.spotify.token)
        }

        // If token is validate, then render routes
        if ( true  ) { //this.props.store.spotify.token_validated
            return (
                <main id="main">
                    <Header />
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/profile' component={Profile}/>
                    </Switch>
                </main>
            )
        }

        return <Signin loginUri={this.getLoginUri()} />;
  }
}


//==================================================================

function mapStateToProps (store) {
    return {
        store: store
    };
}


export default connect( mapStateToProps , { ...spotifyWebAPI } ) (App)
