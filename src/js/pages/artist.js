import React, { Fragment } from 'react';
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import * as actionPlayer from '../store/actions/action_playback'
import * as actionContent from '../store/actions/action_content'
import Musiclist from '../components/ui/musiclist'

import CompAlbum from '../components/ui/compAlbum'
import CompSimilar from '../components/ui/compSimilar'

import { getImage } from '../utility/utility'

//==================================================================

let artistCurrently = null;

class Artist extends React.Component {

    startFetching (artistID) {
        this.props.getArtistData(
            artistID,
            "getArtistAlbums",
            "GET_ARTIST_ALBUMS",
            "Vi kunne ikke hente albums fra denne kunstner"
        );

        this.props.getArtistData(
            artistID,
            "getArtist",
            "GET_ARTIST",
            "Vi kunne ikke hente oplysningerne fra denne kunster"
        );

        this.props.getArtistData(
            artistID,
            "getArtistRelatedArtists",
            "GET_ARTIST_RELATED_ARTISTS",
            "Vi kunne finde relaterede kunstnere"
        );

        this.props.getArtistData(
            artistID,
            "getArtistTopTracks",
            "GET_ARTIST_TOP_TRACKS",
            "Vi kunne hente kunstnerens top tracks",
            "US"
        );

    }

    render () {

        let artists         = this.props.store.content.artists;
        let artistID        = this.props.match.params.id;

        if (artists.hasOwnProperty(artistID) == false) {

            if ( artistID !== artistCurrently) {
                artistCurrently = artistID;
                this.startFetching (artistID);
            }

            return null;
        }

        return (
            <div className="container">
                <div className="container-item" id="artist">
                    <div className="artist-content">
                        <div className="artist-backdrop-container">
                            {   artists[artistID].hasOwnProperty("id") ?
                                <div className="artist-backdrop" >
                                    <img className="artist-img" src={getImage(artists[artistID].images, 500, "user" )} alt="" />
                                    <div className="artist-img-overlay"></div>
                                    <h1 className="artist-h1">{artists[artistID].name}</h1>
                                </div> : null
                            }
                            {
                                artists[artistID].hasOwnProperty("topTracks") ?
                                <div className="artist-toptracks">
                                    <h2 className="artist-toptracks-header">Top tracks</h2>
                                    <Musiclist
                                        playlist={artists[artistID].topTracks}
                                        options={{nr: true, song:true, time: true}}
                                        actions={ { playerPlay: this.props.playerPlay, playerAddTrackToQueue: this.props.playerAddTrackToQueue } }
                                        device_id={this.props.store.spotify.device_id} />
                                </div> : null
                            }
                        </div>
                        <div className="artist-albums">
                            <CompAlbum artists={artists} artistID={artistID} />
                        </div>
                        <div className="artist-similar">
                            <CompSimilar artists={artists} artistID={artistID} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


/* <div className="artist-backdrop-wrapper">
    <div className="artist-img-backdrop" style={{backgroundImage: `url(${ artists[artistID].images[0].url })`}}></div>
    <div className="artist-img-overlay"></div>
</div> */

export default connect(store => {return {store: store }}, { ...actionContent, ...actionPlayer }) (Artist)
