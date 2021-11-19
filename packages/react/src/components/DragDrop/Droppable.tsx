import React from 'react';

import {Current, useDragDropContext} from '.';
import {createStyle} from '../../utils/style';

const droppableStyle = createStyle({
  display: 'inline-block',
});

export interface DroppableProps {
  onDragEnter?: (current: Current) => void;
  onDrop?: (current: Current) => void;
}

const Droppable: React.FC<DroppableProps> = ({onDragEnter, onDrop, children}) => {
  const {current} = useDragDropContext();

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = event => {
    event.preventDefault();
  };

  const handleDragEnter: React.DragEventHandler<HTMLDivElement> = event => {
    event.preventDefault();

    if (current) {
      onDragEnter?.(current);
    }
  };

  const handleDrop: React.DragEventHandler<HTMLDivElement> = event => {
    event.preventDefault();

    if (current) {
      onDrop?.(current);
    }
  };

  return (
    <span onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDrop={handleDrop} style={droppableStyle}>
      {children}
    </span>
  );
};

export default Droppable;
