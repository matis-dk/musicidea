import React from 'react';
import { Switch, withRouter, Route } from 'react-router'
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import * as actionUsers from '../store/actions/action_user'

import CompArtist from '../components/ui/compArtist'
import CompAlbumCover from '../components/ui/compAlbumCover'

import { Transition } from 'react-transition-group';

//==================================================================

let userCurrently = null;

let optionsAlbumCover      = {  delete: true, play: true };


class Profile extends React.Component {

    render () {

        if (this.props.store.user.userId !== userCurrently) {

            userCurrently = this.props.store.user.userId;

            // Fetching
            this.props.getUserPlaylists();
            this.props.getMyTopArtists();

            return null;
        }


        return (<div className="container">
            <div className="container-item" id="profile">
                <div className="profile-playlists">
                    <CompAlbumCover
                        albumCover={this.props.store.user.userPlaylists}
                        header="Your playlists"
                        type="/playlist/"
                        options={optionsAlbumCover} />
                </div>
                <div className="profile-top-artists">
                    <h2 className="profile-header">Your top artists</h2>
                    <hr/>
                    <ul className="profile-list">
                        {
                            this.props.store.user.userTopArtists
                                .slice(0, 12)
                                .map((artist, index) => (
                                    <CompArtist artist={artist} key={artist.id}  />
                                ))
                        }
                    </ul>
                </div>
            </div>
        </div>)
    }
}


export default connect(store => {return {store: store }}, { ...actionUsers }) (withRouter(Profile))
