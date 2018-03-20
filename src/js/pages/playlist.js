import React, { Fragment } from 'react';
import { connect } from 'react-redux'

import Musiclist from '../components/ui/musiclist';
import PlaylistDescription from '../components/ui/playlistdescription';


import * as actionContent from '../store/actions/action_content'

//==================================================================

class Playlist extends React.Component {

    componentDidMount () {
        console.log(this.props)
        let method, type, msg, id, owner;

        if (this.props.match.params.type == "playlist") {
            id = this.props.match.params.owner;
            method = "getPlaylist"
            type = "GET_PLAYLIST"
            msg = "Vi kunne ikke hente denne playliste"
            owner = this.props.match.params.id;
        } else {
            id = this.props.match.params.id;
            method = "getAlbum"
            type = "GET_ALBUM"
            msg = "Vi kunne ikke hente dette album"
            owner = null;
        }

        this.props.getArtistData(
            this.props.store.spotify.init,
            id,
            method,
            type,
            msg,
            owner
        );

    }

    render () {

        let playlists, playlist;

        if (this.props.match.params.type == "playlist") {
            playlists     = this.props.store.content.playlists;                 // current playlists in the store
            playlist      = playlists[this.props.match.params.id];              // the actually playlist
        } else {
            playlists     = this.props.store.content.albums;                     // current albums in the store
            playlist      = playlists[this.props.match.params.id];              // the actually playlist
        }
        
        let options       = {nr: true, song:true, artist:true, time:true, settings:true};

        return (
            <div className="container">
                <div className="container-item" id="playlist">

                    {
                        playlist ?
                        <Fragment>
                            <PlaylistDescription playlist={playlist} />
                            <Musiclist playlist={playlist.tracks.items} options={options} />
                        </Fragment> :
                        null
                    }

                </div>
            </div>
        )
    }
}


export default connect(store => {return {store: store }}, { ...actionContent }) (Playlist)
