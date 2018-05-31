import React from 'react';
import { connect } from 'react-redux';

import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { Route, Switch } from 'react-router-dom'

import Home from './pages/home'
import Signin from './pages/signin'
import About from './pages/about'
import Profile from './pages/profile'
import Explore from './pages/explore'
import Playlist from './pages/playlist'
import Artist from './pages/artist'
import Contact from './pages/contact'

import Header from './components/layout/header'
import Player from './components/ui/player'


//==================================================================

class App extends React.Component {

    render() {

        let CSSTransitionKey = this.props.location.pathname.split('/')[1];

        const transitionMap = {
            none: { classNames: 'ani-none', timeout: { enter: 0, exit: 0 } },
            explore: { classNames: 'ani-explore', timeout: { enter: 700, exit: 500 } },
            about: { classNames: 'ani-pop', timeout: { enter: 700, exit: 500 } },
            contact: { classNames: 'ani-pop', timeout: { enter: 700, exit: 500 } },
            artist: { classNames: 'ani-pop', timeout: { enter: 700, exit: 500 } },
            profile: { classNames: 'ani-profile', timeout: { enter: 700, exit: 350 } },
            playlist: { classNames: 'ani-pop', timeout: { enter: 700, exit: 500 } }
        };

        // Rendering routes if token is valid 
        if (this.props.store.spotify.loginAllowed) {
            return (
                <main id="main">
                    <TransitionGroup style={{ overflow: "hidden" }}>
                        <Header store={this.props.store} />
                        <CSSTransition timeout={600} classNames="ani-default" key={CSSTransitionKey} {...transitionMap[CSSTransitionKey]} >
                            <Switch location={this.props.location}>
                                <Route exact path='/' component={Home} />

                                <Route path='/profile' component={Profile} />

                                <Route path='/explore' component={Explore} />
                                <Route path='/contact' component={Contact} />
                                <Route path='/about' component={About} />

                                <Route path='/playlist/:owner/:type/:id' component={Playlist} />
                                <Route path='/artist/:id' component={Artist} />

                                <Route path='/' component={Home} />
                            </Switch>
                        </CSSTransition>
                        <Player />
                    </TransitionGroup>
                </main>
            )
        } else {
            return <Signin />;
        }
    }
}



//==================================================================

export default connect(store => { return { store: store } })(App)


//==================================================================
