import React, { Fragment } from 'react';
import { connect } from 'react-redux'

import Musiclist from '../components/ui/musiclist';
import PlaylistDescription from '../components/ui/playlistdescription';


import * as actionContent from '../store/actions/action_content'
import * as actionPlayer from '../store/actions/action_playback'

//==================================================================

let playlistCurrently = null;
let options       = {nr: true, song:true, artist:true, time:true, settings:true};

class Playlist extends React.Component {

    startFetching (id, method, type, msg, owner) {
        this.props.getArtistData(
            id,
            method,
            type,
            msg,
            owner
        );
    }

    // playerPlayContext (context_uri, offset) {
    //     console.log(this.props)
    //     //this.props.playerPlayContext(this.props.store.spotify.device_id, offset)
    // }

    render () {

        let playlist;

        let paramsID  = this.props.match.params.id;
        let paramsType= this.props.match.params.type;

        let store     = this.props.store;

        if (paramsType == "playlist") {
            if ( store.content.playlists[paramsID] ) {
                playlist = store.content.playlists[paramsID];
            } else if (playlistCurrently !== paramsID) {
                this.startFetching(this.props.match.params.owner, "getPlaylist", "GET_PLAYLIST", "Vi kunne ikke hente denne playliste", paramsID);
                playlistCurrently = paramsID;
            }
        }

        if (paramsType == "album") {
            if ( store.content.albums[paramsID] ) {
                playlist = store.content.albums[paramsID];
            } else if (playlistCurrently !== paramsID) {
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
                            <PlaylistDescription
                                playlist={playlist}
                                actions={ { playerPlayContext: this.props.playerPlayContext, playerAddPlaylistToQueue: this.props.playerAddPlaylistToQueue }}
                                device_id={this.props.store.spotify.device_id} />
                            <Musiclist
                                playlist={playlist.tracks.items}
                                options={options}
                                actions={ { playerPlayContext: this.props.playerPlayContext, playerAddTrackToQueue: this.props.playerAddTrackToQueue } }
                                device_id={this.props.store.spotify.device_id}
                                playlistUri={playlist.uri}  />
                        </Fragment> : null
                    }
                </div>
            </div>
        )
    }
}


export default connect(store => {return {store: store }}, { ...actionContent, ...actionPlayer }) (Playlist)
