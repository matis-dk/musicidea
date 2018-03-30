import React, { Component } from 'react';

import { Checkbox, Icon } from 'antd';

import { throttle } from 'lodash';

//==================================================================


function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

function callMe () {
    console.log("//==================================================================")
}

//==================================================================

class Explore extends Component {

    state = {
        value: ""
    }

    handleSearch (e) {
        this.setState({value: e.target.value})

        _.throttle(callMe, 200)
    }


    render() {
        return (
            <div className="container">
                <div className="container-item" id="explore">
                    <div className="explore-content">
                        <div className="explore-search">
                            <div className="es-search">
                                <Icon className="es-search-icon" type="search" />
                                <input
                                    value={this.state.value}
                                    onChange={(e) => {  _.throttle(callMe, 200) }}
                                    className="es-search-field"
                                    type="text"
                                    placeholder="Search"
                                    spellCheck="false"  />
                            </div>
                            <div className="es-filter">
                                <Checkbox className="es-checkbox" onChange={onChange}>Artists</Checkbox>
                                <Checkbox className="es-checkbox" onChange={onChange}>Albums</Checkbox>
                                <Checkbox className="es-checkbox" onChange={onChange}>Tracks</Checkbox>
                                <Checkbox className="es-checkbox" onChange={onChange}>Playlists</Checkbox>
                            </div>
                        </div>
                        <div className="explore-result">
                            <div className="er-wrapper">artists</div>
                            <div className="er-wrapper">albums</div>
                            <div className="er-wrapper">tracks</div>
                            <div className="er-wrapper">playlists</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Explore;
