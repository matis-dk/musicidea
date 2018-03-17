import React, { Component } from 'react';

import Musiclist from '../components/ui/musiclist';
import Playlist from '../components/ui/playlist';


class Explore extends Component {


    render() {
        return (
            <div className="container">
                <div className="container-item" id="explore">
                    <Playlist />
                    <Musiclist />
                </div>
            </div>
        )
    }
}

export default Explore;
