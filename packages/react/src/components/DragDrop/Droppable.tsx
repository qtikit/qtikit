import React from 'react';

import {Current, useDragDropContext} from '.';
import {createStyle} from '../../utils/style';

const droppableStyle = createStyle({
  display: 'inline-flex',
});

export interface DroppableProps {
  style?: React.CSSProperties;
  onDragEnter?: (current: Current) => void;
  onDrop?: (current: Current) => void;
}

const Droppable: React.FC<DroppableProps> = ({style, onDragEnter, onDrop, children}) => {
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
    <span
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDrop={handleDrop}
      style={{...droppableStyle, ...style}}>
      {children}
    </span>
  );
};

export default Droppable;
