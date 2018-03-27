import React from 'react';

import { Switch, Icon, Slider, Button, Modal } from 'antd';
import DroppableItem from './droppableitem'

import * as actionPlayer from '../../store/actions/action_playback'

import { connect } from 'react-redux'

import * as spotifyWeb from '../../data/spotifyWeb';


//==================================================================

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

        let playback     = this.props.store.playback;

        return (
            <div className={this.state.menuActive ? "player-wrapper show-player-menu" : "player-wrapper" }>
                <div className="player-toggle">
                    <div className="player-toggle-menu" onClick={ () => {this.toggleMenu()}}>
                        <span><Icon type="bars" /></span>
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
                    <div className="player-navigation">
                        <span className="player-nav"  ><Icon type="step-backward" /></span>
                        <span
                            className="player-nav player-nav-play"
                            onClick={() => { playback.playing ?
                                this.props.playerPause(spotifyWeb.init, playback.queue) :
                                this.props.playerPlay(spotifyWeb.init, playback.queue) }} >
                            <Icon type={playback.playing ? "play-circle-o" : "pause-circle-o" }/>
                        </span>
                        <span className="player-nav"  ><Icon type="step-forward" /></span>
                    </div>
                </div>
                <div className="player-item player-playlist">
                    <div className="player-playlist-wrapper">
                        <div className="player-playlist-cat">
                            <h5 className="text-player-playerlist-cat">Songs</h5>
                            <h5 className="text-player-playerlist-cat"><Icon type="clock-circle-o" /> Time</h5>
                        </div>
                        <DroppableItem />
                    </div>
                </div>
                <div className="player-item player-settings">
                    <div className="player-switch-wrapper">
                        <div className="player-settings-switch" onClick={ () => { this.props.playerSetRepeat(spotifyWeb.init, !playback.repeat) } }>
                            <span className="player-settings-icon"><Icon type="retweet" /></span>
                            <Switch
                                checkedChildren={<Icon type="check" />}
                                unCheckedChildren={<Icon type="cross" />}
                                checked={Boolean(playback.repeat)} />
                        </div>
                        <div className="player-settings-switch" onClick={ () => { this.props.playerSetShuffle(spotifyWeb.init, !playback.shuffle) } }>
                            <span className="player-settings-icon"><Icon type="swap" /></span>
                            <Switch
                                checkedChildren={<Icon type="check" />}
                                unCheckedChildren={<Icon type="cross" />}
                                checked={Boolean(playback.shuffle)} />
                        </div>
                    </div>
                    <div className="player-settings-tools">
                        <Icon className="player-icon" type="delete" />
                        <Icon className="player-icon" type="save" />
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(store => {return {store: store }}, { ...actionPlayer }) (Player)
