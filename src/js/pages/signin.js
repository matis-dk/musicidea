import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import { Button, Link, Icon, Modal } from 'antd';


import * as spotifyOAuth from '../store/actions/action_spotifyOAuth'
import * as actionPlayer from '../store/actions/action_playback'

import logo from '../../img/musicidea-logo.svg';
import microphone from '../../img/musicidea-logo-microphone.svg'
import landingpage from '../../img/landingpage.jpg';

//==================================================================

class Signin extends React.Component {

    state = {
        modalVisible: false
    }

    setModalVisible(modalVisible) {
        this.setState({ modalVisible });
    }

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


    disableSignin = () => {

        // Looking for token in store
        if (this.props.store.spotify.token) {
            return false
        }

        // Looking for token in localstorage
        if (localStorage.getItem('token') ) {
            this.props.spotifySetTokenFromLocalStorage();
            return false;
        }

        // Looking for token in URL
        if (this.props.location.hash ) {
            this.props.spotifySetTokenFromURL(this.props.location.hash);
            //this.props.history.replace('/');
            return false
        };

        return true;
    }


    // Trying to login
    handleLogin = () => {
        this.props.spotifyValidateToken(this.props.store.spotify.token, this.props.updatePlaybackState);

        // Adjusting URL
        this.props.history.replace('/');



    }



    render () {
        return (
            <div className="signin-wrapper" style={{backgroundImage: `url(${landingpage})`}}>
                <img className="signin-logo" src={logo} alt=""/>
                <div className="signin-box">
                    <h1 className="signin-header">Login</h1>
                    <div className="signin-img-wrapper" style={{backgroundImage: `url(${landingpage})`}}></div>
                    <div className="signin-form">
                        <div className="signin-spotify">
                            <Button type="primary" icon="form" size="large" className="signin-buttons">
                                <a className="signin-spotify-button" href={this.getLoginUri()}>Log på Spotify</a>
                            </Button>
                            <Button
                                type="primary"
                                icon="poweroff"
                                size="large"
                                className="signin-buttons"
                                loading={this.props.store.spotify.isLoading}
                                onClick={this.handleLogin}
                                disabled={this.disableSignin()}>
                                Log på MusicIdea
                            </Button>
                        </div>
                    </div>
                    <Icon className="signin-modal" type="question-circle-o" onClick={() => this.setModalVisible(true)} />
                </div>
                <a className="signin-github" href="https://www.github.com/matis-dk/musicidea" target="_blank">
                    <Icon type="github" />
                </a>
                <Modal
                   title="Velkommen til MusicIdea!"
                   wrapClassName="vertical-center-modal"
                   visible={this.state.modalVisible}
                   onOk={() => this.setModalVisible(false)}
                   onCancel={() => this.setModalVisible(false)}
                 >
                    <p>Denne side anvender Spotify's åbne web api, og kræver derfor at du har en konto hos Spotify før du kan drage nytte af denne applikation. </p>
                    <p>Du skal derfor give os dit samtykke, før vi kan se dine brugeroplysninger.</p>
                    <br/>
                    <p>Bare rolig, fortrolige informationer såsom password har vi naturligvis ikke adgang til!</p>
                 </Modal>
            </div>
        )
    }
}



export default connect(store => {return {store: store }}, { ...spotifyOAuth, ...actionPlayer })(withRouter(Signin))
