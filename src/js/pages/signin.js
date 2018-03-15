import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import { Button, Link, Icon, notification } from 'antd';

import * as spotifyWebAPI from '../store/actions/action_spotifyWebAPI'



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
                        <h1 className="signin-header">Sign-in </h1>
                        <p className="signin-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt veniam, vel numquam repellat possimus nobis itaque laudantium neque quo, iusto, dolorem? Dolor quibusdam itaque deserunt sapiente aliquid autem qui tenetur.</p>
                        <div className="signin-spotify">
                            <Button type="primary" size="large" className="signin-buttons">
                                <a className="signin-spotify-button" href={this.getLoginUri()}>Sign into Spotify</a>
                            </Button>
                            <Button type="primary" icon="poweroff" size="large" className="signin-buttons" loading={this.props.store.spotify.isLoading} onClick={this.handleLogin} disabled={this.isTokenAvailabel()}>
                                Sign into MusicIdea
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
