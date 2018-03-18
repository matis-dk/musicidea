import React from 'react';
import { connect } from 'react-redux'

import * as actionContent from '../store/actions/action_content'


class Artist extends React.Component {

    componentWillMount() {


        this.props.getArtistAlbums(
            this.props.store.spotify.init,
            this.props.history,
            this.props.match.params.id
        );

        this.props.getArtist(
            this.props.store.spotify.init,
            this.props.history,
            this.props.match.params.id
        );

        // this.props.getArtistAlbums(
        //     this.props.store.spotify.init,
        //     this.props.history,
        //     this.props.match.params.id
        // );
    }

    render () {

        let artistID = this.props.match.params.id;
        let artists = this.props.store.content.artists;

        if (!artists[artistID]) { return <div></div> }

        return (
            <div className="container">
                <div className="container-item" id="artist">
                    <div className="artist-backdrop" style={{backgroundImage: `url(${this.props.store.content.artists[artistID].images[0].url})`}}>
                        
                    </div>
                    <div className="artist-content">
                        <h1>Artist page!</h1>
                    </div>

                </div>
            </div>
        )
    }
}


export default connect(store => {return {store: store }}, { ...actionContent }) (Artist)
