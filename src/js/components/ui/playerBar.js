import React, { Fragment } from 'react'

import { Slider } from 'antd'

import { openNotification, convertMsToMin, calcPercentage } from '../../utility/utility'

import { connect } from 'react-redux'

import * as actionPlayer from '../../store/actions/action_playback'

//==================================================================

let timer;

class PlayerBar extends React.Component {

    state = {
        trackPositionPercentage: 0,
        trackPosition: 0
    }

    getState () {
        return this.props.store.playback.current_state
    }

    isPlaying () {
        return this.props.store.playback.playing
    }

    calcPercentage (position) {
        let temp = Math.floor( position / this.getState()["duration"] * 100 );

        if (Number.isInteger(temp)) {
            return temp
        } else {
            return 0
        }
    }

    handleDrag (position) {

        this.setState({
            trackPositionPercentage: position,
            trackPosition: position / this.props.store.playback.current_state.duration
        })
    }

    handleAfterDrag (position) {

        let updatePosition = Math.floor(this.props.store.playback.current_state.duration / 100 * position)
        this.props.playerSetPosition(updatePosition, this.props.store.spotify.device_id)
    }


    componentWillMount() {

        let storePosition = 0;

        timer = setInterval(function () {

            // STATE INITIALIZED
            if (this.getState() == null) { return }

            // PLAYING
            if ( this.isPlaying() == true ) {

                // Checking if we are using the lastest position
                if (storePosition !== this.getState()["position"]) {
                    storePosition = this.getState()["position"];

                    this.setState({
                        trackPositionPercentage: this.calcPercentage(storePosition),
                        trackPosition: storePosition
                    })
                    return;
                }

                this.setState({
                    trackPositionPercentage: this.calcPercentage(this.state.trackPosition),
                    trackPosition: this.state.trackPosition + 1000
                })

                // UPDATE POSITION IF YOU WANT?
            }

            // PAUSED
            if ( this.isPlaying() == false ) {
                this.setState({
                    trackPositionPercentage: this.calcPercentage(this.state.trackPosition),
                    trackPosition: (this.getState()["position"])
                })
            }

        }.bind(this), 1000 )
    }


    render () {

        let store        = this.props.store;
        let playback     = store.playback;
        let trackName    = (playback.current_state == null) ? "Select track" : playback.current_state.track_window.current_track.name;

        return (
            <Fragment>
                <div className="player-track-wrapper">
                    <h3 className="player-track-h3" >{ trackName }</h3>
                </div>
                <div className="player-track-bar" >
                    <Slider
                        tipFormatter={null}
                        defaultValue={0}
                        onAfterChange={(e) => { this.handleAfterDrag(e) }}
                        onChange={(e) => { this.handleDrag(e) }}
                        value={ this.state.trackPositionPercentage } />
                </div>
                <div className="player-track-duration">
                    <span>{ convertMsToMin(this.state.trackPosition) }</span>
                    <i>-</i>
                    <span>{ playback.current_state ? convertMsToMin(playback.current_state.duration) : "00:00" }</span>
                </div>
            </Fragment>
        )
    }

}


export default connect(store => { return {store: store} }, { ...actionPlayer })(PlayerBar);
