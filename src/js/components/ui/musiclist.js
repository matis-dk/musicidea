import React from 'react';

class Musiclist extends React.Component {

    render () {

        return (
            <div className="wrapper-musiclist" >
                <h2 className="musiclist-name">80' R&B Perfection</h2>
                <tabel className="musiclist-tabel">
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
                        <tr className="musiclist-tr" data-current="false">
                            <td className="musiclist-td m-nr">01</td>
                            <td className="musiclist-td m-song">Crazy For You</td>
                            <td className="musiclist-td m-artist">Madonna</td>
                            <td className="musiclist-td m-duration">04:47</td>
                            <td className="musiclist-td m-settings">I</td>
                        </tr>
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
                </tabel>
            </div>
        )
    }
}

export default Musiclist;
