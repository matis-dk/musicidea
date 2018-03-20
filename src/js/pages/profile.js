import React from 'react';
import { Switch, withRouter, Route } from 'react-router'
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import * as actionUsers from '../store/actions/action_user'

import CompArtist from '../components/ui/compArtist'

let userCurrently = null;

class Profile extends React.Component {

    render () {

        if (this.props.store.user.userId !== userCurrently) {

            userCurrently = this.props.store.user.userId;

            // Fetching
            this.props.getUserPlaylists(this.props.store.spotify.init);
            this.props.getMyTopArtists(this.props.store.spotify.init);

            return null;
        }


        return (
            <div className="container">
                <div className="container-item" id="profile">
                    <div className="profile-playlists">
                        <h2 className="profile-header">Your playlists</h2>
                        <hr/>
                        <ul className="profile-playlist-list">
                            {
                                this.props.store.user.userPlaylists.map((item) => (
                                    <li className="profile-playlist-item"
                                        style={{backgroundImage: `url(${item.images[0].url})`}}
                                        key={item.id}>
                                        <Link to={"/playlist/" + item.owner.id + "/playlist/" + item.id} className="profile-playlist-link">
                                            <h3 className="profile-item-header">{item.name}</h3>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="profile-top-artists">
                        <h2 className="profile-header">Your top artists</h2>
                        <hr/>
                        <ul className="profile-list">
                            {
                                this.props.store.user.userTopArtists
                                    .slice(0, 12)
                                    .map((artist) => (
                                        <CompArtist artist={artist} key={artist.id} />
                                    ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(store => {return {store: store }}, { ...actionUsers }) (withRouter(Profile))
