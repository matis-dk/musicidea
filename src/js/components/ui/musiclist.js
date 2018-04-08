import React from 'react';
import { Icon } from 'antd'
import { Link } from 'react-router-dom'

import * as utility from '../../utility/utility'

//==================================================================


function getArtists (artists) {
    return artists.map((artist) => (
        <Link key={artist.id} className="m-artist" to={"/artist/" + artist.id}>
            { artist.name }
        </Link>
    ))
}



const Musiclist = ( {playlist, options, actions, device_id, playlistUri} ) => {
    if (options == undefined) {
        options = {}
    }

    function handlePlayContext(index, currentContext) {
        actions.playerPlayContext(device_id, playlistUri, index, currentContext)
    }

    function handlePlayTrack (uri) {
        actions.playerPlay(device_id, uri, false)
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
                                        <td className="musiclist-td m-nr-wrap" onClick={() => { actions.playerPlayContext ? handlePlayContext(index, "playlist") : handlePlayTrack(item.uri) }} >
                                            <span className="m-nr"> { utility.convertMusicNr(index) } </span>
                                            <Icon className="musiclist-buttons" type="play-circle-o" />
                                        </td> : null }
                                    { options.song ? <td className="musiclist-td m-song">{ item.name || item.track.name }</td> : null }
                                    { options.artist ?
                                        <td className="musiclist-td m-artist-wrapper">
                                            { item.artists ? getArtists(item.artists) : getArtists(item.track.artists) }
                                        </td> : null }
                                    { options.time ? <td className="musiclist-td m-duration">{utility.convertMsToMin(item.duration_ms || item.track.duration_ms)  }</td> : null }
                                    { options.settings ?
                                        <td className="musiclist-td m-settings">
                                            <Icon className="musiclist-buttons musiclist-button-show"  type="heart-o" />
                                            <Icon className="musiclist-buttons"  type="plus-circle-o" onClick={() => {actions.playerAddTrackToQueue(item)}} />
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
