import React, { Fragment } from 'react';
import { connect } from 'react-redux'

import Musiclist from '../components/ui/musiclist';
import PlaylistDescription from '../components/ui/playlistdescription';


import * as actionContent from '../store/actions/action_content'

//==================================================================

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
            this.state.playlistOwner
        );
    }

    render () {

        let playlists     = this.props.store.content.playlists;            // current playlists in the store
        let playlist      = playlists[this.state.playlistID];              // the actually playlist


        return (
            <div className="container">
                <div className="container-item" id="playlist">

                    {
                        playlist ?
                        <Fragment>
                            <PlaylistDescription playlist={playlist} />
                            <Musiclist playlist={playlist} />
                        </Fragment> :
                        <div></div>
                    }

                </div>
            </div>
        )
    }
}


export default connect(store => {return {store: store }}, { ...actionContent }) (Playlist)
