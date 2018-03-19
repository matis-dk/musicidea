import React from 'react';
import { Switch, withRouter, Route } from 'react-router'
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import * as actionUsers from '../store/actions/action_user'


class Profile extends React.Component {

    componentDidMount () {
        this.props.getUserPlaylists(this.props.store.spotify.init);
        this.props.getMyTopArtists(this.props.store.spotify.init);
    }

    render () {
        return (
            <div className="container">
                <div className="container-item" id="profile">
                    <div className="profile-playlists">
                        <h1 className="profile-header">Your playlists</h1>
                        <ul className="profile-playlist-list">
                            {
                                this.props.store.user.userPlaylists.map((item) => (
                                    <li className="profile-playlist-item"
                                        style={{backgroundImage: `url(${item.images[0].url})`}}
                                        key={item.id}>
                                        <Link to={"/playlist/" + item.owner.id + "/" + item.id} className="profile-playlist-link">
                                            <h3 className="profile-item-header">{item.name}</h3>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="profile-top-artists">
                        <h1 className="profile-header">Your top artists</h1>
                        <ul className="profile-list">
                            {
                                this.props.store.user.userTopArtists.slice(0, 14).map((item) => (
                                        <li className="profile-list-item" key={item.id}>
                                            <Link to={"/artist/" + item.id}>
                                                <img className="profile-list-img" src={item.images[0].url} alt={item.name}/>
                                            </Link>
                                            <div className="profile-list-artist">
                                                <h2>{item.name}</h2>
                                                <p>{item.popularity} points</p>
                                            </div>
                                        </li>
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
