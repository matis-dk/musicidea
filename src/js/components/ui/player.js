import React from 'react';

import { Switch, Icon, Slider, Button, Modal, Input  } from 'antd';
import DroppableItem from './droppableitem'

import * as actionPlayer from '../../store/actions/action_playback'

import { connect } from 'react-redux'

import * as spotifyWeb from '../../data/spotifyWeb';

import { openNotification, utilGetUrisFromTrack } from '../../utility/utility'

import PlayerBar from './playerBar'

//==================================================================

class Player extends React.Component {

    state = {
        volumeValueTemp: this.props.store.playback.volume,
        volumeHide: true,
        menuActive: false,
        menuSaveLoading: false,
        menuSaveVisible: false,
        menuSaveNameValue: ""
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
            // If songs is added to the queue, but there isnt any state yet
            this.props.playerPlay(this.props.store.spotify.device_id, playback.queue[0].track.uri, "queue", playback.queue[0].timestamp)

            return;
            //==================================================================
        }

        this.props.playerResume(this.props.store.spotify.device_id)
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

    handleOk = () => {
      this.props.playerSaveQueue(
          this.props.store.user.userId, 
          this.state.menuSaveNameValue,
          utilGetUrisFromTrack(this.props.store.playback.queue))

      this.setState({ menuSaveVisible: false });
    }

    handleCancel = () => {
      this.setState({ menuSaveVisible: false });
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
                        <span className="player-nav" onClick={ () => {
                            this.props.playerSkip(
                                "skipToPrevious",
                                store.spotify.device_id,
                                store.playback ) } } >
                            <Icon type="step-backward" />
                        </span>
                        <span
                            className="player-nav player-nav-play"
                            onClick={() => { playback.playing ?
                                this.props.playerPause(store.spotify.device_id) :
                                this.handlePlay() }} >
                            <Icon type={playback.playing ? "pause-circle-o" : "play-circle-o" }/>
                        </span>
                        <span className="player-nav" onClick={ () => {
                            this.props.playerSkip(
                                "skipToNext",
                                store.spotify.device_id,
                                store.playback ) } } >
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
                        <Icon className="player-icon player-icon-primary" type="save" onClick={ () => { this.setState({ menuSaveVisible: true }) }} />
                    </div>
                </div>
                <div>
                    <Modal
                        visible={this.state.menuSaveVisible}
                        title="Gem spilleliste i Spotify"
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>Annulere</Button>,
                            <Button key="submit" type="primary" loading={this.state.menuSaveLoading} onClick={this.handleOk}> Gem </Button>,
                        ]}
                    >
                      <p>Angiv title på spillelisten</p>
                      <br/>
                      <Input placeholder="Spilleliste" value={this.state.menuSaveNameValue} onChange={(e) => {
                          this.setState({menuSaveNameValue: e.target.value})
                      }} />
                    </Modal>
                </div>
            </div>
        )
    }
}


export default connect(store => {return {store: store }}, { ...actionPlayer }) (Player)
