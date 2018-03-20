import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import CompArtist from './compArtist'

const CompSimilar  = ( { artists, artistID } ) => {

    if (artists[artistID].hasOwnProperty("relatedArtists") == false) { return null }

    return (
        <Fragment>
            <h2 className="artist-album-header">Related artists</h2>
            <hr/>
            <ul className="artists-related">
                {
                    artists[artistID].relatedArtists
                        .slice(0, 18)
                        .map((relatedArtist) => (
                            <CompArtist artist={relatedArtist} key={relatedArtist.id} />
                        ))
                }
            </ul>
        </Fragment>
   )
}

export default CompSimilar;
