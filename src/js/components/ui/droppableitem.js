import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import DraggableComp from './draggableitem'

// fake data generator
const getItems = () => (
    [{ id: "item-1", content: "item 1"},
    { id: "item-2", content: "item 2"},
    { id: "item-3", content: "item 3"},
    { id: "item-4", content: "item 4"},
    { id: "item-5", content: "item 5"},
    { id: "item-6", content: "item 6"}])


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};


const getListStyle = (isDraggingOver) => {
    //console.log("IS DRAGGING OVER ? " + isDraggingOver);
    // Add style for drag on off
};

class Droppableitem extends Component {

    state = {
      items: getItems(),
    };


  onDragEnd(result) {

    // Dropped outside the list
    if (!result.destination) { return }

    const items = reorder( this.state.items, result.source.index,  result.destination.index );

    this.setState({ items });

    console.log(items)

  }

  render() {
    return (
        <div className="item-droppable-container">

          <DragDropContext onDragEnd={(result) => this.onDragEnd(result)}>
            <Droppable droppableId="droppable">

                {(provided, snapshot) => (
                    <div className="item-droppable" ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                        {provided.placeholder}

                        <DraggableComp items={this.state.items} />

                    </div>
                )}

            </Droppable>
          </DragDropContext>

      </div>
    );
  }
}

export default Droppableitem;
