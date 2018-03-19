import React from 'react';
import { connect } from 'react-redux'

import * as actionContent from '../store/actions/action_content'


let artistID;

class Artist extends React.Component {

    componentDidMount() {

        this.props.getArtistData(
            this.props.store.spotify.init,
            artistID,
            "getArtistAlbums",
            "GET_ARTIST_ALBUMS",
            "Vi kunne ikke hente albums fra denne kunstner"
        );

        this.props.getArtistData(
            this.props.store.spotify.init,
            artistID,
            "getArtist",
            "GET_ARTIST",
            "Vi kunne ikke hente oplysningerne fra denne kunster"
        );

        this.props.getArtistData(
            this.props.store.spotify.init,
            artistID,
            "getArtistRelatedArtists",
            "GET_ARTIST_RELATED_ARTISTS",
            "Vi kunne finde relaterede kunstnere"
        );

        this.props.getArtistData(
            this.props.store.spotify.init,
            artistID,
            "getArtistTopTracks",
            "GET_ARTIST_TOP_TRACKS",
            "Vi kunne hente kunstnerens top tracks",
            "US"
        );


        // Top tracks for a specific artist
        // Artists similar to a specific artist
    }


    render () {

        let artists     = this.props.store.content.artists;
        artistID    = this.props.match.params.id;


        // Checking objects nested properties
        if (artists.hasOwnProperty(artistID) == false) {
            console.log("ENTERING 1")
            return <div></div>
        }

        if ( (artists[artistID].hasOwnProperty("albums") == false) || (artists[artistID].hasOwnProperty("id") == false) ) {
            console.log("ENTERING 2")
            return <div></div>
        }

        return (
            <div className="container">
                {   console.log("ENTERING 3") }
                <div className="container-item" id="artist">


                    <div className="artist-content">
                        <div className="artist-left">
                            <div className="artist-backdrop" style={{backgroundImage: `url(${artists[artistID].images[0].url})`}}>
                                <div className="artist-img-overlay"></div>
                                <h1 className="artist-h1">{artists[artistID].name}</h1>
                            </div>
                            <div className="artist-albums">
                                <h1 className="artist-album-header">Albums</h1>
                                <ul className="artist-album-list">
                                    {
                                        artists[artistID].albums
                                            .filter((item) => (item.album_type == "album" && item.album_group == "album") )
                                            .map((track) => (
                                                <li key={track.id} className="artist-album-item" >
                                                    <img className="artist-album-image" src={track.images[0].url} alt=""/>
                                                    <p className="artist-album-date">{parseFloat(track.release_date)}</p>
                                                    <h3 className="artist-album-name">{track.name}</h3>
                                                </li>
                                            ))
                                    }
                                </ul>
                            </div>
                            <div className="artist-similar">slider</div>
                        </div>
                        <div className="artist-right">
                            <div>Top tracks!</div>
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

export default connect(store => {return {store: store }}, { ...actionContent }) (Artist)
