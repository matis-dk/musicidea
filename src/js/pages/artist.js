import React from 'react';
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import * as actionContent from '../store/actions/action_content'
import Musiclist from '../components/ui/musiclist'

let artistID;

class Artist extends React.Component {

    componentDidMount () {

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
        artistID        = this.props.match.params.id;


        // Checking objects nested properties
        if (artists.hasOwnProperty(artistID) == false) {
            console.log("ENTERING 1")
            return <div></div>
        }

        if ( (artists[artistID].hasOwnProperty("albums") == false) ||
             (artists[artistID].hasOwnProperty("id") == false) ||
             (artists[artistID].hasOwnProperty("relatedArtists") == false)  ) {
            console.log("ENTERING 2")
            return <div></div>
        }

        return (
            <div className="container">
                {   console.log("ENTERING 3") }
                <div className="container-item" id="artist">
                    <div className="artist-content">
                        <div className="artist-backdrop-container">
                            <div className="artist-backdrop" style={{backgroundImage: `url(${artists[artistID].images[0].url})`}}>
                                <div className="artist-img-overlay"></div>
                                <h1 className="artist-h1">{artists[artistID].name}</h1>
                            </div>
                            <div className="artist-toptracks">
                                <h2 className="artist-toptracks-header">Top tracks</h2>
                                {
                                    artists[artistID].hasOwnProperty("topTracks") ?
                                    <Musiclist playlist={artists[artistID].topTracks} options={{nr: true, song:true, time: true}} /> :
                                    <div></div>
                                }
                            </div>
                        </div>
                        <div className="artist-albums">
                            <h2 className="artist-album-header">Albums</h2>
                            <hr/>
                            <ul className="artist-album-list">
                                {
                                    artists[artistID].albums
                                        .filter((item) => (item.album_type == "album" && item.album_group == "album") )
                                        .map((album) => (
                                            <li key={album.id} className="artist-album-item" >
                                                <Link to={"/playlist/" + artistID + "/album/" + album.id}>
                                                    <img className="artist-album-image" src={album.images[0].url} alt=""/>
                                                </Link>
                                                <p className="artist-album-date">{parseFloat(album.release_date)}</p>
                                                <h3 className="artist-album-name">{album.name}</h3>
                                            </li>
                                        ))
                                }
                            </ul>
                        </div>
                        <div className="artist-similar">
                            <h2 className="artist-album-header">Related artists</h2>
                            <hr/>
                            <ul>
                                {
                                    artists[artistID].relatedArtists
                                        .map((relatedArtist) => (
                                            <li key={relatedArtist.id}>
                                                <Link to={`/artist/${relatedArtist.id}`}>
                                                    <p>{relatedArtist.name}</p>
                                                </Link>
                                            </li>
                                        ))
                                }
                            </ul>
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
