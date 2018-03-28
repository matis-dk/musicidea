import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import DraggableComp from './draggableitem'
import * as actionPlayer from '../../store/actions/action_playback'

import { connect } from 'react-redux'


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};


class Droppableitem extends Component {

  onDragEnd(result) {

    // Dropped outside the list
    if (!result.destination) { return }

        // Reordering queue and updating state
    const items = reorder( this.props.store.playback.queue, result.source.index,  result.destination.index );
    this.props.playerReorderQueue(items)
  }

  playerRemoveTrackFromQueue (id) {
        this.props.playerRemoveTrackFromQueue (id, this.props.store.playback.queue)
  }

  playerPlay (uri) {
      this.props.playerPlay(this.props.store.spotify.device_id, uri)
  }

  render() {
    return (

          <DragDropContext onDragEnd={(result) => this.onDragEnd(result)}>
            <Droppable droppableId="droppable">
                {
                    (provided, snapshot) => (
                        <div className="item-droppable" ref={provided.innerRef} >
                            {provided.placeholder}
                            <DraggableComp
                                items={this.props.store.playback.queue}
                                playerRemoveTrackFromQueue={this.playerRemoveTrackFromQueue.bind(this)}
                                playerPlay={ this.playerPlay.bind(this) }/>
                        </div>
                    )
                }
            </Droppable>
          </DragDropContext>

    );
  }
}


export default connect(store => {return {store: store }}, { ...actionPlayer }) (Droppableitem)
