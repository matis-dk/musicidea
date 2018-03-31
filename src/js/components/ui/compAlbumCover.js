import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { getImage } from '../../utility/utility'

//==================================================================

const CompAlbumCover  = ( { albumCover, header, type } ) => {
    return (
        <Fragment>
            <h2 className="profile-header">{header}</h2>
            <hr/>
            <ul className="profile-playlist-list">
                {
                    albumCover.slice(0, 12).map((item) => (
                        <li className="profile-playlist-item"
                            style={{ backgroundImage: `url(${ getImage(item.images, 300, "album") })` }}
                            key={item.id}>
                            <Link to={"/playlist/" + (item.owner ? item.owner.id : "null") + type + item.id} className="profile-playlist-link">
                                <h4 className="profile-item-header">{item.name}</h4>
                            </Link>
                        </li> )
                    )
                }
            </ul>
        </Fragment>
   )
}

export default CompAlbumCover;
