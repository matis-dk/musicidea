import React from 'react';
import { connect } from 'react-redux'

import Musiclist from '../components/ui/musiclist';
import PlaylistDescription from '../components/ui/playlistdescription';

import { notification } from 'antd';

import * as actionPlaylist from '../store/actions/action_playlist'

//==================================================================

// let playlist = [];
// function findPlaylistInStore (playlists, id) {
//     return playlists.filter((item) => {
//         if (item.id == id) { return item };
//         return false;
//     })
// }
// //playlist = findPlaylistInStore ( this.props.store.user.userPlaylists, playlistID);


let playlistID;

class Playlist extends React.Component {

    componentWillMount() {
        if (!this.props.match.params.id) {
            this.props.history.replace('/');

            notification.config({
                placement: 'bottomLeft'
            });
            notification.open({
                message: "Fejl",
                description: "Vi kan ikke tilgå denne side uden et kunster ID",
                icon: <Icon type="meh" style={{ color: '#108ee9' }} />,
            });
        }

        // Getting playlist by id
        playlistID = this.props.match.params.id;

        this.props.getPlaylist(this.props.store.spotify.init, playlistID);


        // if ( playlist.length == 0 ) {
        //     this.props.history.replace('/');
        // }
    }

    render () {

        return (
            <div className="container">
                <div className="container-item" id="playlist">
                    <PlaylistDescription playlistDes={playlist} />
                    <Musiclist playlistID={playlistID} />
                </div>
            </div>
        )
    }
}


export default connect(store => {return {store: store }}, { ...actionPlaylist }) (Playlist)
