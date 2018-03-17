import React from 'react';

import { Switch, Icon, Slider, Button } from 'antd';
import DroppableItem from './droppableitem'


function formatter(value) {
  return `${value}%`;
}


class Player extends React.Component {

    state = {
        volumeValue: 30,
        volumeHide: true,
        menuActive: false
    }

    volumeControl (e) {
        console.log(e)
        let volume = Number(e)
        if (volume < 10) {
            volume = "0" + volume;
        }
        this.setState({
            volumeValue: volume,
            volumeHide: false
        })
    }

    toggleMenu() {
        let newState = {
            ...this.state
        }
        this.setState({
            ...newState,
            menuActive: !newState.menuActive
        })
    }

    render () {
        return (
            <div className={this.state.menuActive ? "player-wrapper show-player-menu" : "player-wrapper" }>
                <div className="player-toggle">
                    <div className="player-toggle-menu" onClick={ () => {this.toggleMenu()}}>
                        <span><Icon type="arrows-alt" /></span>
                    </div>
                    <div className="player-toggle-music">
                        <div className="player-music-slider">
                            <Slider
                                vertical
                                tipFormatter={null}
                                defaultValue={this.state.volumeValue}
                                onChange={ (e) => {this.volumeControl(e)} }
                                onAfterChange={ () => {this.setState({ volumeHide: true })} }/>
                            <h1 className={this.state.volumeHide ? "player-music-volume hide-volumebar" : "player-music-volume" } >{this.state.volumeValue}</h1>
                        </div>
                        <Button type="primary" shape="circle" icon="sound" size="large" />
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
                    <div className="player-switch-wrapper">
                        <div className="player-settings-switch">
                            <span className="player-settings-icon"><Icon type="retweet" /></span>
                            <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} />
                        </div>
                        <div className="player-settings-switch">
                            <span className="player-settings-icon"><Icon type="swap" /></span>
                            <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />}  />
                        </div>
                    </div>
                    <div className="player-settings-tools">
                        <Button className="player-save-playlist" shape="circle" icon="save" ghost  />
                    </div>
                </div>
                <div className="player-item player-playlist">
                    <div className="player-playlist-wrapper">
                        <div className="player-playlist-cat">
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
