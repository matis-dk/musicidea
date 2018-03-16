import React from 'react';

import { Switch, Icon, Slider, Button } from 'antd';
import DroppableItem from './droppableitem'


function formatter(value) {
  return `${value}%`;
}


class Player extends React.Component {


    render () {
        return (

            <div id="player-wrapper">
                <div className="player-toggle">
                    <div className="player-toggle-menu">
                        <span><Icon type="arrows-alt" /></span>
                    </div>
                    <div className="player-toggle-music">
                        <span className="player-music-button">
                            <div className="player-music-slider">
                                <Slider vertical tipFormatter={formatter} defaultValue={30} onChange={(e) => {console.log(e)}} />
                            </div>
                            <Button type="primary" shape="circle" icon="sound" size="large" />
                        </span>
                    </div>
                </div>
                <div className="player-item player-control">
                    <h2 className="player-current-song">50 Cent - In Da Club</h2>
                    <div className="player-navigation">
                        <div>
                            <span className="player-nav"><Icon type="step-backward" /></span>
                            <span className="player-nav"><Icon type="play-circle" /></span>
                            <span className="player-nav"><Icon type="step-forward" /></span>
                        </div>
                    </div>
                </div>
                <div className="player-item player-settings">
                    <div className="player-settings-switch">
                        <span className="player-settings-icon"><Icon type="retweet" /></span>
                        <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked />
                    </div>
                    <div className="player-settings-switch">
                        <span className="player-settings-icon"><Icon type="swap" /></span>
                        <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked />
                    </div>
                </div>
                <div className="player-item player-playlist">
                    <div className="player-playlist-wrapper">
                        <div className="player-playlist-cat">
                            <h5 className="text-player-playerlist-cat">#</h5>
                            <h5 className="text-player-playerlist-cat">Song</h5>
                            <h5 className="text-player-playerlist-cat"><Icon type="clock-circle-o" /> Time</h5>
                        </div>
                        <DroppableItem />
                    </div>
                </div>
                <div className="player-item player-cover">
                    <div className="player-cover-img">COVER</div>
                </div>
            </div>
        )
    }
}


export default Player;
