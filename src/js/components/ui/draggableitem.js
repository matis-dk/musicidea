import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { Icon } from 'antd'

const getItemStyle = (isDragging, draggableStyle) => {

    return {
      // change background colour if dragging
      //background: isDragging ? 'lightgreen' : 'grey',

      // styles we need to apply on draggables
      ...draggableStyle,
    };
}

export default ( { items, playerRemoveTrackFromQueue, playerPlay, currentTrack } ) => {

    return items.map((item, index) => (
        <Draggable key={item.timestamp} draggableId={item.timestamp} index={index} >

            {(provided, snapshot) => (
              <div className="item-draggable">
                {provided.placeholder}
                <div
                  className={(currentTrack == item.timestamp) ? "item-draggable-inner item-current" : "item-draggable-inner"}
                  ref={provided.innerRef}  {...provided.draggableProps} {...provided.dragHandleProps}
                  style={getItemStyle( snapshot.isDragging, provided.draggableProps.style )}
                >
                    <div className="item-draggable-track-name">{ item.name }</div>
                    <div className="item-draggable-track-settings">
                        <Icon className="player-icon-danger" type="close-circle-o" onClick={() => { playerRemoveTrackFromQueue(item.timestamp) }} />
                        <Icon className="player-icon-primary" type="play-circle-o" onClick={() => { playerPlay(item.uri, "queue", item.timestamp) }} />
                    </div>
                </div>
              </div>
            )}

        </Draggable>
    ))

}
