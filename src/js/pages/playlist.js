import React, { Fragment } from 'react';
import { connect } from 'react-redux'

import Musiclist from '../components/ui/musiclist';
import PlaylistDescription from '../components/ui/playlistdescription';


import * as actionContent from '../store/actions/action_content'

//==================================================================

let playlistCurrently = null;
let options       = {nr: true, song:true, artist:true, time:true, settings:true};

class Playlist extends React.Component {

    startFetching (id, method, type, msg, owner) {
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

        let playlist;

        let paramsID  = this.props.match.params.id;
        let paramsType= this.props.match.params.type;

        let store     = this.props.store;

        if (paramsType == "playlist") {
            if ( store.content.playlists[paramsID] ) {
                playlist = store.content.playlists[paramsID];
            } else if (playlistCurrently !== paramsID) {
                //this.startFetching(id, method, type, msg, owner);     <- argument order
                this.startFetching(this.props.match.params.owner, "getPlaylist", "GET_PLAYLIST", "Vi kunne ikke hente denne playliste", paramsID);

                playlistCurrently = paramsID;
            }
        }

        if (paramsType == "albums") {
            if ( store.content.albums[paramsID] ) {
                playlist = store.content.albums[paramsID];
            } else if (playlistCurrently !== paramsID) {
                //this.startFetching(id, method, type, msg, owner);     <- argument order
                this.startFetching(paramsID, "getAlbum", "GET_ALBUM", "Vi kunne ikke hente dette album", null);

                playlistCurrently = paramsID;
            }
        }



        return (
            <div className="container">
                <div className="container-item" id="playlist">
                    {
                        playlist ?
                        <Fragment>
                            <PlaylistDescription playlist={playlist} />
                            <Musiclist playlist={playlist.tracks.items} options={options} />
                        </Fragment> : null

                    }
                </div>
            </div>
        )
    }
}


export default connect(store => {return {store: store }}, { ...actionContent }) (Playlist)
