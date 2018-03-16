import React, { Component } from 'react';

import Musiclist from '../components/ui/musiclist'

class Explore extends Component {


    render() {
        return (
            <div className="container">
                <div id="explore">
                    <Musiclist />
                </div>
            </div>
        )
    }
}

export default Explore;
