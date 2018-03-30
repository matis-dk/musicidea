import React from 'react';

import { Switch, Icon, Slider, Button, Modal } from 'antd';
import DroppableItem from './droppableitem'

import * as actionPlayer from '../../store/actions/action_playback'

import { connect } from 'react-redux'

import * as spotifyWeb from '../../data/spotifyWeb';

import { openNotification } from '../../utility/utility'

import PlayerBar from './playerBar'

//==================================================================

class Player extends React.Component {

    state = {
        volumeValueTemp: this.props.store.playback.volume,
        volumeHide: true,
        menuActive: false
    }

    handleVolume (volume) {
        this.setState({
            volumeValueTemp: volume,
            volumeHide: false
        })
    }

    handleVolumeAfter (volume) {
        this.setState({
            volumeHide: true
        });
        this.props.playerSetVolume(this.props.store.spotify.device_id , volume);

        // Need a timer to hide volumeValueTemp pointer - Redux only have the old value yet
        setTimeout(() => {
            this.setState({
                volumeValueTemp: this.props.store.playback.volume
            })
        }, 500)
    }

    handlePlay () {
        let playback     = this.props.store.playback;

        if (playback.current_state == null) {
            if (playback.queue.length == 0) {
                openNotification("Mangler spilleliste", "Vi vil super gerne spille noget, men du skal først lige tilføje det til spillelisten")
                return;
            }
            // SONG SELECTION IN QUEUE? FIX LATER
            this.props.playerPlay(this.props.store.spotify.device_id, playback.queue[0].track.uri)
            return;
            //==================================================================
        }
        this.props.playerPlay(this.props.store.spotify.device_id, playback.current_state.track_window.current_track.uri)
    }

    handlePlayerMenu() {
        let newState = {
            ...this.state
        }
        this.setState({
            ...newState,
            menuActive: !newState.menuActive
        })
    }

    render () {

        let store        = this.props.store;
        let playback     = store.playback;

        let volume       = this.state.volumeValueTemp;

        return (
            <div className={this.state.menuActive ? "player-wrapper show-player-menu" : "player-wrapper" }>
                <div className="player-toggle">
                    <div className="player-toggle-menu" onClick={ () => {this.handlePlayerMenu()}}>
                        <span><Icon type="bars" /></span>
                    </div>
                    <div className="player-toggle-music">
                        <div className="player-music-slider">
                            <Slider
                                vertical
                                tipFormatter={null}
                                defaultValue={volume}
                                onChange={ (e) => {this.handleVolume(e)} }
                                onAfterChange={ (e) => { this.handleVolumeAfter(e) } }/>
                            <h1 className={this.state.volumeHide ? "player-music-volume hide-volumebar" : "player-music-volume" } >
                                { ((Number(volume) < 10) ? "0" + volume : volume ) }
                            </h1>
                        </div>
                        <Button type="primary" shape="circle" icon="sound" size="large" />
                    </div>
                </div>
                <div className="player-item player-control">
                    <div className="player-navigation">
                        <span className="player-nav" onClick={ () => { this.props.playerPrevTrack(store.spotify.device_id) } } >
                            <Icon type="step-backward" />
                        </span>
                        <span
                            className="player-nav player-nav-play"
                            onClick={() => { playback.playing ?
                                this.props.playerPause(store.spotify.device_id) :
                                this.handlePlay() }} >
                            <Icon type={playback.playing ? "pause-circle-o" : "play-circle-o" }/>
                        </span>
                        <span className="player-nav" onClick={ () => { this.props.playerNextTrack(store.spotify.device_id) } } >
                            <Icon type="step-forward" />
                        </span>
                    </div>
                </div>
                <div className="player-item player-track">
                    <PlayerBar />
                </div>
                <div className="player-item player-playlist">
                    <div className="player-playlist-wrapper">
                        <div className="player-playlist-cat">
                            <h5 className="text-player-playerlist-cat"><Icon className="player-icon" type="coffee" />Tracks</h5>
                            <h5 className="text-player-playerlist-cat"><Icon className="player-icon" type="setting" /> Options</h5>
                        </div>
                        <DroppableItem />
                    </div>
                </div>
                <div className="player-item player-settings">
                    <div className="player-switch-wrapper">
                        <div className="player-settings-switch" onClick={ () => { this.props.playerSetRepeat(playback.repeat) } }>
                            <span className="player-settings-icon"><Icon type="retweet" /></span>
                            <Switch
                                checkedChildren={<Icon type="check" />}
                                unCheckedChildren={<Icon type="cross" />}
                                checked={Boolean(playback.repeat)} />
                        </div>
                        <div className="player-settings-switch" onClick={ () => { this.props.playerSetShuffle(!playback.shuffle) } }>
                            <span className="player-settings-icon"><Icon type="swap" /></span>
                            <Switch
                                checkedChildren={<Icon type="check" />}
                                unCheckedChildren={<Icon type="cross" />}
                                checked={Boolean(playback.shuffle)} />
                        </div>
                    </div>
                    <div className="player-settings-tools">
                        <Icon className="player-icon player-icon-danger" type="delete" onClick={ () => { this.props.playerDeleteQueue() }} />
                        <Icon className="player-icon player-icon-primary" type="save" />
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(store => {return {store: store }}, { ...actionPlayer }) (Player)
