import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const getItemStyle = (isDragging, draggableStyle) => ({
  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

export default ( { items } ) => {

    return items.map((item, index) => (
        <Draggable key={item.id} draggableId={item.id} index={index}>

            {(provided, snapshot) => (
              <div className="item-draggable">
                {provided.placeholder}

                <div
                  ref={provided.innerRef}  {...provided.draggableProps} {...provided.dragHandleProps}
                  style={getItemStyle( snapshot.isDragging, provided.draggableProps.style )}
                >

                    {item.content}

                </div>


              </div>
            )}

        </Draggable>
    ))

}
