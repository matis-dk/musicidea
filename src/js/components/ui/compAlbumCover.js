import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { getImage } from '../../utility/utility'

import { Icon } from 'antd'

import { connect } from 'react-redux'

import * as actionPlayer from '../../store/actions/action_playback'

//==================================================================

class CompAlbumCover extends React.Component {

    handlePlay (uri) {
        let device_id = this.props.store.spotify.device_id;
        this.props.playerPlayContext(device_id, uri, 0, "playlist")
    }

    handleDelete (playlistId) {
        this.props.playerDeletePlaylist(this.props.store.user.userId, playlistId);
    }

    render () {

        let { albumCover, header, type, options } = this.props;

        return (
            <Fragment>
                <h2 className="profile-header">{header}</h2>
                <hr/>
                <ul className="profile-playlist-list">
                    {
                        albumCover.slice(0, 12).map((item) => (
                            <li className="profile-playlist-item"
                                style={{ backgroundImage: `url(${ getImage(item.images, 300, "album") })` }}
                                key={item.id}>
                                <Link to={"/playlist/" + (item.owner ? item.owner.id : "null") + type + item.id} className="profile-playlist-link">
                                    <h4 className="profile-item-header">{item.name}</h4>
                                </Link>
                                <div className="profile-playlist-options">
                                    { options.play ? <Icon className="ppo-icons" type="play-circle-o" onClick={() => { this.handlePlay(item.uri) }} /> : null }
                                    { options.like ? <Icon className="ppo-icons" type="heart-o" onClick={ () => { this.handleLike(albumCover) } } /> : null }
                                    { options.delete ? <Icon className="ppo-icons" type="delete" onClick={ () => { this.handleDelete(item.id) } }  /> : null }
                                </div>
                            </li> )
                        )
                    }
                </ul>
            </Fragment>
       )
    }
}

export default connect(store => {return {store: store }}, { ...actionPlayer }) (CompAlbumCover)
