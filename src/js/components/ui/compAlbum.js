import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const CompAlbum  = ( { artists, artistID } ) => {

    if (artists[artistID].hasOwnProperty("albums") == false) { return null }

    let albums = artists[artistID].albums
                    .filter((item) => (item.album_type == "album" && item.album_group == "album") );

    if (albums.length == 0) { return null }

    return (
        <Fragment>
            <h2 className="artist-album-header">Albums</h2>
            <hr/>
            <ul className="artist-album-list">
            {
                   albums.map((album) => (
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
        </Fragment>
   )
}

export default CompAlbum;
