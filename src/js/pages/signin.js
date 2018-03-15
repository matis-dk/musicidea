import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import { Button, Link, Icon, notification } from 'antd';

import * as spotifyWebAPI from '../store/actions/action_spotifyWebAPI'

import logo from '../../img/Musicidea-logo-min.svg'

//==================================================================

class Signin extends React.Component {

    // Creating login URI
    getLoginUri = () => {
        const spotifyBase       = "https://accounts.spotify.com/authorize";
        const client_id         = "90dfc7083d684563888561ce310f940a";
        const redirect_uri      = "http://localhost:3000/";
        const response_type     = "token";

        return `${spotifyBase}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}`;
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

    openNotification = (message="Ukendt fejl", description="Noget gik helt galt", smiley="meh") => {
        notification.config({
            placement: 'bottomLeft'
        });
        notification.open({
            message: message,
            description: description,
            icon: <Icon type={smiley} style={{ color: '#108ee9' }} />,
        });
    };


    // Trying to login
    handleLogin = () => {
        this.props.spotifyValidateToken(
            this.props.store.spotify.token,
            this.openNotification);

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
                        <p className="signin-description">Velkommen til MusicIdea! Denne side anvender Spotify's åbne web api, og kræver derfor at du har en konto hos Spotify før du kan drage nytte af denne applikation. Du skal give os dit samtykke før vi kan anvende, og se dine bruger oplysninger.</p>
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

export default connect(mapStateToProps, { ...spotifyWebAPI })(withRouter(Signin))
