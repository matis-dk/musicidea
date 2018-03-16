import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import DraggableComp from './draggableitem'

// fake data generator
const getItems = () => (
    [{ id: "item-1", content: "Heartbreaker"},
    { id: "item-2", content: "Bring it all to me"},
    { id: "item-3", content: "Tonite"},
    { id: "item-4", content: "Love me (feat. Mase)"},
    { id: "item-5", content: "If It Isn't Love"},
    { id: "item-6", content: "Bring it all to me"},
    { id: "item-7", content: "Tonite"},
    { id: "item-8", content: "Love me (feat. Mase)"},
    { id: "item-9", content: "If It Isn't Love"},
    // { id: "item-10", content: "Bring it all to me"},
    // { id: "item-11", content: "Tonite"},
    // { id: "item-12", content: "Love me (feat. Mase)"},
    // { id: "item-13", content: "If It Isn't Love"},
    // { id: "item-14", content: "Tonite"},
    // { id: "item-15", content: "Love me (feat. Mase)"},
    // { id: "item-16", content: "If It Isn't Love"},
    // { id: "item-17", content: "Bring it all to me"},
    // { id: "item-18", content: "Tonite"},
    // { id: "item-19", content: "Love me (feat. Mase)"},
    // { id: "item-20", content: "If It Isn't Love"},
    { id: "item-21", content: "Adorn"}])


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

    );
  }
}

export default Droppableitem;
