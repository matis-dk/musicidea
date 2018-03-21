import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';



class Profile extends React.Component {

    render () {

        return (
            <div className="container">
                <div className="container-item" id="about">
                    <div className="container-about">
                        <div className="about-musicidea">
                            <h2 className="profile-header">About Musicidea</h2>
                            <hr/>
                            <p>
                                Musicidea er demo side som udgør en del af min læringsproces, og skal derfor ikke ses som en komplet side.
                                <br/><br/>
                                I projektet bliver der udforsket hvorledes React og Redux i særdelshed kan anvendes som byggestenene til denne SPA.
                                Der bliver anvendt forskellige routing teknikker, intern lagring af state således refetch af tidligere besøgte sider undgåes, og samtidig øger performance.
                                Siden anvender flere komponenter fra Ant Design CSS frameworked, og Spotify Web API samt deres Playback SDK til rå data og musikafspilning.
                                <br/><br/>
                                React's CSS transition group bliver anvendt til håndtering af animationer og transitioner.
                            </p>
                        </div>
                        <div className="about-contributors">
                            <h2 className="profile-header">Credits</h2>
                            <hr/>
                            <p>Der gives et stor tak til alle bidragsyderer, der i større eller mindre omfang tilføj remedier til at gøre det projekt muligt</p>
                            <br/><br/>
                            <div className="ac-items">
                                <h3>Data</h3>
                                <ul>
                                    <li>
                                        Stotify Web API and Spotify Playback SDK
                                    </li>
                                </ul>
                            </div>
                            <div className="ac-items">
                                <h3>Images & Icons</h3>
                                <ul>
                                    <li className="ac-items-li">
                                        <p>Sign-in baggrundsbillede</p>
                                        <a href="https://unsplash.com/photos/hFzIoD0F_i8" target="_blank">Unsplash</a>
                                    </li>
                                    <li className="ac-items-li">
                                        <p>Landing page baggrundsbillede</p>
                                        <a href="https://unsplash.com/photos/hFzIoD0F_i8" target="_blank">Unsplash</a>
                                    </li>
                                    <li className="ac-items-li">
                                        <p>Logo ikon</p>
                                        <a href='https://www.freepik.com/free-vector/microphone-icons-set_760532.htm'>Designed by Freepik</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(store => {return {store: store }} ) (Profile)
