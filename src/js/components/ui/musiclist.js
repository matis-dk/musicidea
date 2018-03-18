import React from 'react';
import { Icon } from 'antd'

import { Link } from 'react-router-dom'

function convertMsToMin (ms) {
    let minutes = Math.floor(ms / 60000).toString();
    let seconds = ((ms % 60000) / 1000).toFixed(0);

    if (minutes.length == 1) { minutes = "0" + minutes }

    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function getMusicNr (index) {
    index = index + 1;
    if ( index < 10 ) {
        return "0" + index
    }
    return index
}

class Musiclist extends React.Component {

    render () {

        const playlistTracks = this.props.playlist.tracks.items;

        return (
            <div className="wrapper-musiclist" >
                <table className="musiclist-table">
                    <thead className="musiclist-thead">
                        <tr className="musiclist-tr-panel">
                            <th className="musiclist-th m-th-nr">#</th>
                            <th className="musiclist-th">song</th>
                            <th className="musiclist-th">artist</th>
                            <th className="musiclist-th m-th-duration">time</th>
                            <th className="musiclist-th m-th-settings">settings</th>
                        </tr>
                    </thead>
                    <tbody className="musiclist-tbody">

                        {
                            playlistTracks.map((item, index) => {

                                return (
                                    <tr key={item.track.id} className="musiclist-tr" data-current="false">
                                        <td className="musiclist-td m-nr-wrap">
                                            <span className="m-nr"> { getMusicNr(index) } </span>
                                            <Icon className="musiclist-buttons" type="play-circle-o" />
                                        </td>
                                        <td className="musiclist-td m-song">{ item.track.name }</td>
                                        <td className="musiclist-td m-artist-wrapper">
                                            { item.track.artists.map((artist) => (
                                                <Link key={artist.id} className="m-artist" to={"/artist/" + artist.id}>
                                                    { artist.name }
                                                </Link>
                                            ))
                                            }
                                        </td>
                                        <td className="musiclist-td m-duration">{convertMsToMin(item.track.duration_ms)  }</td>
                                        <td className="musiclist-td m-settings">
                                            <Icon className="musiclist-buttons"  type="share-alt" />
                                            <Icon className="musiclist-buttons"  type="plus-circle-o" />
                                        </td>
                                    </tr>
                                )
                            })
                        }


                    </tbody>
                </table>
            </div>
        )
    }
}

export default Musiclist;
