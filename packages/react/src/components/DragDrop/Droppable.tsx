import React from 'react';

import {classNameForComponent} from '../../utils/style';
import {Current, useDragDropContext} from '.';

export interface DroppableProps {
  style?: React.CSSProperties;
  className?: string;
  onDragEnter?: (current: Current) => void;
  onDrop?: (current: Current) => void;
}

const Droppable: React.FC<DroppableProps> = ({style, className, onDragEnter, onDrop, children}) => {
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
      className={`${classNameForComponent('dropable')} ${className}`}
      style={style}>
      {children}
    </span>
  );
};

export default Droppable;
