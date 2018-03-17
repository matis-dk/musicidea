import React from 'react';

import { Button, Radio, Icon } from 'antd';


const PlaylistDescription = () => {

    return (
        <div className="wrapper-playlist">
            <div className="playlist-image"></div>
            <div className="playlist-des">
                <h1 className="playlist-name">Astrid S</h1>
                <div className="playlist-tags-container">
                    <span className="playlist-tags">Electro</span>
                    <span className="playlist-tags">Rock</span>
                    <span className="playlist-tags">Vibes</span>
                </div>
                <p className="playlist-des-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem animi qui ullam asperiores voluptas, assumenda praesentium modi incidunt non, sint architecto laudantium ipsam dicta, odit itaque maxime ratione! Natus, sapiente!</p>
                <div className="playlist-buttons">
                    <Button type="primary" icon="play-circle-o" size="default">Play</Button>
                    <Button type="primary" icon="plus-circle-o" size="default" className="playlist-buttons-default" >Add to playlist</Button>
                </div>
            </div>
        </div>
    )

}

export default PlaylistDescription;
