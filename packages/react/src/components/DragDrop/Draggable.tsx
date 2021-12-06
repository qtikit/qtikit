import React from 'react';

import {Current, useDragDropContext} from '.';

export interface DraggableProps {
  current: Omit<Current, 'name'> & Partial<Pick<Current, 'name'>>;
  style?: React.CSSProperties;
  className?: string;
}

const Draggable: React.FC<DraggableProps> = ({current: optionalCurrent, style, className, children}) => {
  const {setCurrent} = useDragDropContext();

  const current = {...optionalCurrent, name: optionalCurrent.name ?? optionalCurrent.value};

  const handleDragStart: React.DragEventHandler<HTMLDivElement> = () => {
    setCurrent(current);
  };

  const handleDragEnd: React.DragEventHandler<HTMLDivElement> = () => {
    setCurrent(null);
  };

  return (
    <span
      className={`qtikit-component__droggable ${className}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={style}>
      {children}
    </span>
  );
};

export default Draggable;
