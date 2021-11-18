import React from 'react';

import {Current, useDragDropContext} from '.';

const droppableStyle = {
  display: 'inline-block',
};

export interface DroppableProps {
  onDrop: (current: Current) => void;
}

const Droppable: React.FC<DroppableProps> = ({onDrop, children}) => {
  const {current, setCurrent} = useDragDropContext();

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = event => {
    event.preventDefault();
  };

  const handleDragEnter: React.DragEventHandler<HTMLDivElement> = event => {
    event.preventDefault();
  };

  const handleDrop: React.DragEventHandler<HTMLDivElement> = event => {
    event.preventDefault();

    if (current) {
      onDrop(current);
      setCurrent(null);
    }
  };

  return (
    <span onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDrop={handleDrop} style={droppableStyle}>
      {children}
    </span>
  );
};

export default Droppable;
