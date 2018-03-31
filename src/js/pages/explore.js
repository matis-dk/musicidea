import React, { Component } from 'react';

import { Checkbox, Icon } from 'antd';

import { debounce } from 'lodash';

import * as searchActions from '../store/actions/action_explore'
import * as playerActions from '../store/actions/action_playback'

import { connect } from 'react-redux'

import CompArtist from '../components/ui/compArtist'

import { Link } from 'react-router-dom'

import Musiclist from '../components/ui/musiclist';

//==================================================================

let options       = {nr: true, song:true, artist:true, time:true, settings:true};


class Explore extends Component {

    constructor (props) {
        super(props);
        this.state = {
            value: "",
            artist: true,
            album: true,
            track: true
        }

        this.handleSearchBounceX = this.handleSearchBounceX.bind(this)
    }

    handleCheck (e, type) {
        this.setState({
            [type]: e
        })
    }

    handleChange (e) {
        this.setState( {
            value: e
        } )
    }

    handleSearchBounceX = debounce((e) => {
        if (e.length < 2) { return }

        let types = Object.keys(this.state).filter((i) =>  {
        	if (this.state[i] === true) {
                return true
            }
            return false;
        })

       this.props.searchQuery(e, types)
    }, 300)


    render() {

        let result = this.props.store.explore.search_result;

        return (
            <div className="container">
                <div className="container-item" id="explore">
                    <div className="explore-content">

                        <div className="explore-search">
                            <div className="es-search">
                                <Icon className="es-search-icon" type="search" />
                                <input
                                    value={this.state.value}
                                    className="es-search-field"
                                    type="text"
                                    placeholder="Search"
                                    spellCheck="false"
                                    onChange={(e) => {
                                        this.handleChange(e.target.value);
                                        this.handleSearchBounceX(e.target.value) }}
                                    />
                            </div>
                            <div className="es-filter">
                                <Checkbox className="es-checkbox" checked={this.state.artist} onChange={(e) => { this.handleCheck(e.target.checked, "artist") }}>
                                    Artists
                                </Checkbox>
                                <Checkbox className="es-checkbox" checked={this.state.album} onChange={(e) => { this.handleCheck(e.target.checked, "album") }}>
                                    Albums
                                </Checkbox>
                                <Checkbox className="es-checkbox" checked={this.state.track} onChange={(e) => { this.handleCheck(e.target.checked, "track") }}>
                                    Tracks
                                </Checkbox>
                            </div>
                        </div>

                        <div className="explore-result">
                            { result.artists && this.state.artist ?
                                <div className="er-wrapper">
                                    <h2 className="profile-header">Artists</h2>
                                    <hr/>
                                    <ul className="profile-list">
                                        {
                                            result.artists.items.slice(0, 12).map((artist) => ( <CompArtist artist={artist} key={artist.id} /> ))
                                        }
                                    </ul>
                                </div> : null
                            }
                            {
                                result.albums && this.state.album ?
                                <div className="er-wrapper">
                                    <h2 className="profile-header">Albums</h2>
                                    <hr/>
                                    <ul className="profile-playlist-list">
                                        {
                                            result.albums.items.slice(0, 12).map((item) => (
                                                <li className="profile-playlist-item"
                                                    style={{ backgroundImage: `url(${ item.images.length > 0 ? item.images[0].url : null })` }}
                                                    key={item.id}>
                                                    <Link to={"/playlist/" + "null" + "/album/" + item.id} className="profile-playlist-link">
                                                        <h3 className="profile-item-header">{item.name}</h3>
                                                    </Link>
                                                </li> )
                                            )
                                        }
                                    </ul>
                                </div> : null
                            }
                            {
                                result.tracks && this.state.track ?
                                <div className="er-wrapper">
                                    <h2 className="profile-header">Tracks</h2>
                                    <hr/>
                                        <Musiclist
                                            playlist={result.tracks.items}
                                            options={options}
                                            actions={ { playerPlay: this.props.playerPlay, playerAddTrackToQueue: this.props.playerAddTrackToQueue } }
                                            device_id={this.props.store.spotify.device_id}
                                            playlistUri="null"  />
                                    }
                                </div> : null
                            }
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}



export default connect (store => ( { store: store }), { ...searchActions, ...playerActions } ) (Explore);
