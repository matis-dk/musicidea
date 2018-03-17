import React, { Fragment } from 'react';
import { connect } from 'react-redux'

import Musiclist from '../components/ui/musiclist';
import PlaylistDescription from '../components/ui/playlistdescription';

import { openNotification } from '../utility/utility'

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


class Playlist extends React.Component {

    state = {
        playlistID: this.props.match.params.id,
        playlistOwner: this.props.match.params.owner
    }

    componentWillMount() {
        this.props.getPlaylist(
            this.props.store.spotify.init,
            this.props.history,
            this.state.playlistID,
            this.state.playlistOwner,
            openNotification
        );

    }

    render () {

        let playlists = this.props.store.playlist;

        return (
            <div className="container">
                <div className="container-item" id="playlist">

                    {
                        playlists[this.state.playlistID] ?
                        <Fragment>
                            <PlaylistDescription playlist={playlists} />
                            <Musiclist playlist={playlists} />
                        </Fragment> :
                        <div></div>
                    }

                </div>
            </div>
        )
    }
}


export default connect(store => {return {store: store }}, { ...actionPlaylist }) (Playlist)
