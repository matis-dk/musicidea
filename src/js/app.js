import React from 'react';
import { connect } from 'react-redux';

import * as spotifyOAuth from './store/actions/action_spotifyOAuth'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import  { Route, Redirect, Switch } from 'react-router-dom'

import * as Application from './data/applicationLogic'

import Home from './pages/home'
import Signin from './pages/signin'
import Profile from './pages/profile'
import Explore from './pages/explore'

import Template from './pages/template'

import Header from './components/layout/header'
import Player from './components/ui/player'


//==================================================================

class App extends React.Component {


    render () {

        // Rendering routes if token is valid
        if ( this.props.store.spotify.loginAllowed  ) {

            return (
                <main id="main">
                    <Header />
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/profile' component={Profile}/>
                        <Route path='/explore' component={Explore}/>
                        <Route path='/template' component={Template}/>
                    </Switch>
                    <Player />
                </main>
            )
        } else {
            return <Signin />;
        }
  }
}


//==================================================================

export default connect( store => {return {store: store }} ) (App)
