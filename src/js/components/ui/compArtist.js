import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import UserDefault from '../../../img/user-default.svg'

const CompArtist  = ( { artist } ) => {
    return (
            <li className="profile-list-item" >
                <Link to={"/artist/" + artist.id}>
                    <img className="profile-list-img" src={artist.images.length > 0 ? artist.images[0].url : UserDefault } alt={artist.name}/>
                </Link>
                <div className="profile-list-artist">
                    <h3>{artist.name}</h3>
                    <p>{artist.popularity} points</p>
                </div>
            </li>
   )
}

export default CompArtist;
