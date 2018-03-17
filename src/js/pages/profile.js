import React from 'react';
import { Switch, withRouter, Route } from 'react-router'
import { connect } from 'react-redux';

import * as actionUsers from '../store/actions/action_user'


class Profile extends React.Component {

    componentWillMount () {
        this.props.getUserPlaylists(this.props.store.spotify.init);
        this.props.getMyTopArtists(this.props.store.spotify.init);
    }

    render () {
        return (
            <div className="container">
                <div className="container-item" id="profile">
                    <div className="profile-playlists">
                        <h1 className="profile-header">Your playlist</h1>
                        <ul className="profile-playlist-list">
                            { this.props.store.user.userPlaylists.map((item) => (
                                <li className="profile-playlist-item"
                                    style={{backgroundImage: `url(${item.images[0].url})`}}
                                    key={item.id}>
                                    <h3 className="profile-item-header">{item.name}</h3>
                                </li>
                            )) }
                        </ul>
                    </div>
                    <div className="profile-top-artists">
                        <h1 className="profile-header">Your top artists</h1>
                        <ul className="profile-list">
                            { this.props.store.user.userTopArtists
                                .slice(0, 20)
                                .map((item) => (
                                    <li className="profile-list-item" key={item.id}>
                                        <img className="profile-list-img" src={item.images[0].url} alt={item.name}/>
                                        <div className="profile-list-artist">
                                            <h2>{item.name}</h2>
                                            <p>{item.popularity} points</p>
                                        </div>
                                    </li>
                                )) }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(store => {return {store: store }}, { ...actionUsers }) (withRouter(Profile))
