import React from 'react';
import { Icon } from 'antd'

import { Link } from 'react-router-dom'

function convertMsToMin (ms) {
    let minutes = Math.floor(ms / 60000).toString();
    let seconds = ((ms % 60000) / 1000).toFixed(0);

    if (minutes.length == 1) { minutes = "0" + minutes }

    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function convertMusicNr (index) {
    index = index + 1;
    if ( index < 10 ) {
        return "0" + index
    }
    return index
}

function getArtists (artists) {
    return artists.map((artist) => (
        <Link key={artist.id} className="m-artist" to={"/artist/" + artist.id}>
            { artist.name }
        </Link>
    ))
}


const Musiclist = ( {playlist, options} ) => {
    if (options == undefined) {
        options = {}
    }

    return (
        <div className="wrapper-musiclist" >
            <table className="musiclist-table">
                <thead className="musiclist-thead">
                    <tr className="musiclist-tr-panel">
                        {options.nr ? <th className="musiclist-th m-th-nr">#</th> : null }
                        {options.song ? <th className="musiclist-th">song</th> : null }
                        {options.artist ? <th className="musiclist-th">artist</th> : null }
                        {options.time ? <th className="musiclist-th m-th-duration">time</th> : null }
                        {options.settings ? <th className="musiclist-th m-th-settings">settings</th> : null }
                    </tr>
                </thead>
                <tbody className="musiclist-tbody">

                    {
                        playlist.map((item, index) => {

                            return (
                                <tr key={item.id || item.track.id } className="musiclist-tr" data-current="false">
                                    {options.nr ?
                                        <td className="musiclist-td m-nr-wrap">
                                            <span className="m-nr"> { convertMusicNr(index) } </span>
                                            <Icon className="musiclist-buttons" type="play-circle-o" />
                                        </td> : null }
                                    { options.song ? <td className="musiclist-td m-song">{ item.name || item.track.name }</td> : null }
                                    { options.artist ?
                                        <td className="musiclist-td m-artist-wrapper">
                                            { item.artists ? getArtists(item.artists) : getArtists(item.track.artists) }
                                        </td> : null }
                                    { options.time ? <td className="musiclist-td m-duration">{convertMsToMin(item.duration_ms || item.track.duration_ms)  }</td> : null }
                                    { options.settings ?
                                        <td className="musiclist-td m-settings">
                                            <Icon className="musiclist-buttons musiclist-button-show"  type="heart-o" />
                                            <Icon className="musiclist-buttons"  type="plus-circle-o" />
                                            <Icon className="musiclist-buttons"  type="share-alt" />
                                        </td> : null }
                                </tr>
                            )
                        })
                    }


                </tbody>
            </table>
        </div>
    )

}

export default Musiclist;
