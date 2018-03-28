import React from 'react';

import { Button, Radio, Icon } from 'antd';


const PlaylistDescription = ({ playlist, actions, device_id }) => {

    return (
        <div className="wrapper-playlist">
            <img className="playlist-image" src={playlist.images[0].url} alt=""/>
            <div className="playlist-des">
                <h1 className="playlist-name">{ playlist.name }</h1>
                <div className="playlist-tags-container">
                    <span className="playlist-tags">Electro</span>
                    <span className="playlist-tags">Rock</span>
                    <span className="playlist-tags">Vibes</span>
                </div>
                <p className="playlist-des-text">{playlist.description}</p>
                <div className="playlist-buttons">
                    <Button type="primary"
                        icon="play-circle-o"
                        size="default"
                        onClick={ () => { actions.playerPlayContext(device_id, playlist.uri, 0) } }
                        >
                        Play album
                    </Button>
                    <Button type="primary"
                        icon="plus-circle-o"
                        size="default"
                        className="playlist-buttons-default"
                        onClick={ () => { actions.playerAddPlaylistToQueue(playlist.tracks.items) } }
                        >
                        Add to queue
                    </Button>
                </div>
            </div>
        </div>
    )

}

export default PlaylistDescription;
