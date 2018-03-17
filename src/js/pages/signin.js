import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import { Button, Link, Icon } from 'antd';

import { openNotification } from '../utility/utility'

import * as spotifyOAuth from '../store/actions/action_spotifyOAuth'

import logo from '../../img/Musicidea-logo-min.svg'

//==================================================================

class Signin extends React.Component {

    // Creating login URI
    getLoginUri = () => {
        const spotifyBase       = "https://accounts.spotify.com/authorize";
        const client_id         = "90dfc7083d684563888561ce310f940a";
        const redirect_uri      = "http://localhost:3000/";
        const response_type     = "token";
        const scope             =  [
            "playlist-read-private",
            "playlist-read-collaborative",
            "playlist-modify-public",
            "playlist-modify-private",
            "streaming",
            "ugc-image-upload",
            "user-follow-modify",
            "user-follow-read",
            "user-library-read",
            "user-library-modify",
            "user-read-private",
            "user-read-birthdate",
            "user-read-email",
            "user-top-read",
            "user-read-playback-state",
            "user-modify-playback-state",
            "user-read-currently-playing",
            "user-read-recently-played"
        ].join(" ");

        return [ spotifyBase,
                    `?client_id=${client_id}`,
                    `&redirect_uri=${redirect_uri}`,
                    `&response_type=${response_type}`,
                    `&scope=${encodeURIComponent(scope)}`].join('');
    }


    isTokenAvailabel = () => {
        // Enabling / disabling signin button based on hash fragment
        if (!this.props.location.hash) {
            this.props.history.replace('/');
            return true
        };

        // Extracting token from url if availabel
        if (!this.props.store.spotify.token) {
            this.props.spotifyGetToken(this.props.location.hash);
        }

        return false;
    }


    // Trying to login
    handleLogin = () => {
        this.props.spotifyValidateToken(
            this.props.store.spotify.token,
            openNotification);

        // Adjusting URL
        this.props.history.replace('/');
    }

    render () {
        return (
            <div className="signin-wrapper">
                <div className="signin-box">
                    <div className="signin-img-wrapper"></div>
                    <div className="signin-form">
                        <img className="signin-logo" src={logo} alt=""/>
                        <p className="signin-description">Velkommen til MusicIdea! Denne side anvender Spotify's åbne web api, og kræver derfor at du har en konto hos Spotify før du kan drage nytte af denne applikation. Du skal derfor give os dit samtykke, før vi kan se dine bruger oplysninger.</p>
                        <div className="signin-spotify">
                            <Button type="primary" icon="form" size="large" className="signin-buttons">
                                <a className="signin-spotify-button" href={this.getLoginUri()}>Giv samtykke</a>
                            </Button>
                            <Button type="primary" icon="poweroff" size="large" className="signin-buttons" loading={this.props.store.spotify.isLoading} onClick={this.handleLogin} disabled={this.isTokenAvailabel()}>
                                Log in på MusicIdea
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps (store) {
    return {
        store: store
    };
}

export default connect(mapStateToProps, { ...spotifyOAuth })(withRouter(Signin))
