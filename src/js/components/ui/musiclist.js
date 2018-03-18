import React from 'react';

function convertMsToMin (ms) {
    let minutes = Math.floor(ms / 60000).toString();
    let seconds = ((ms % 60000) / 1000).toFixed(0);

    if (minutes.length == 1) { minutes = "0" + minutes }

    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

class Musiclist extends React.Component {

    render () {

        const playlistTracks = this.props.playlist.tracks.items;
        console.log(this.props)

        return (
            <div className="wrapper-musiclist" >
                <h2 className="musiclist-name">80' R&B Perfection</h2>
                <table className="musiclist-table">
                    <thead className="musiclist-thead">
                        <tr className="musiclist-tr-panel">
                            <th className="musiclist-th">#</th>
                            <th className="musiclist-th">song</th>
                            <th className="musiclist-th">artist</th>
                            <th className="musiclist-th">time</th>
                            <th className="musiclist-th">settings</th>
                        </tr>
                    </thead>
                    <tbody className="musiclist-tbody">

                        {
                            playlistTracks.map((item, index) => {
                                return (
                                    <tr key={item.track.id} className="musiclist-tr" data-current="false">
                                        <td className="musiclist-td m-nr">{ index }</td>
                                        <td className="musiclist-td m-song">{ item.track.name }</td>
                                        <td className="musiclist-td m-artist">{ item.track.artists[0].name }</td>
                                        <td className="musiclist-td m-duration">{convertMsToMin(item.track.duration_ms)  }</td>
                                        <td className="musiclist-td m-settings">I</td>
                                    </tr>
                                )
                            })
                        }

                        <tr className="musiclist-tr" data-current="false">
                            <td className="musiclist-td m-nr">02</td>
                            <td className="musiclist-td m-song">So Good</td>
                            <td className="musiclist-td m-artist">Davina</td>
                            <td className="musiclist-td m-duration">03:21</td>
                            <td className="musiclist-td m-settings">I</td>
                        </tr>
                        <tr className="musiclist-tr" data-current="true">
                            <td className="musiclist-td m-nr">03</td>
                            <td className="musiclist-td m-song">Can't Let You Go (feat. Mike Shorey & Lil' Mo)</td>
                            <td className="musiclist-td m-artist">Fabolous</td>
                            <td className="musiclist-td m-duration">05:01</td>
                            <td className="musiclist-td m-settings">I</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Musiclist;
