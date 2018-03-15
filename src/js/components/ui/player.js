import React from 'react';

import { Switch, Icon } from 'antd';
import DroppableItem from './droppableitem'



class Player extends React.Component {

    render () {
        return (

            <div id="player-wrapper">
                <div className="player-item player-control">
                    <h3 className="player-current-song">50 Cent - In Da Club</h3>
                    <div className="player-navigation">
                        <div>
                            <span className="player-nav"><Icon type="step-backward" /></span>
                            <span className="player-nav"><Icon type="play-circle" /></span>
                            <span className="player-nav"><Icon type="step-forward" /></span>
                        </div>
                        <span className="player-nav"><Icon type="arrows-alt" /></span>
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
