import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const CompSimilar  = ( { artists, artistID } ) => {

    if (artists[artistID].hasOwnProperty("relatedArtists") == false) { return null }

    return (
        <Fragment>
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
        </Fragment>
   )
}

export default CompSimilar;
