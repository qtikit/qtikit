import React from 'react';

import {classNameForComponent} from '../../utils/style';
import {Current, useDragDropContext} from '.';

export interface DraggableProps {
  current: Omit<Current, 'name'> & Partial<Pick<Current, 'name'>>;
  style?: React.CSSProperties;
  className?: string;
  draggable?: boolean;
}

const Draggable: React.FC<DraggableProps> = ({current: optionalCurrent, style, draggable, className, children}) => {
  const {setCurrent} = useDragDropContext();

  const current = {...optionalCurrent, name: optionalCurrent.name ?? optionalCurrent.value};

  const modifier = draggable ? 'draggable' : 'fixed';

  const handleDragStart: React.DragEventHandler<HTMLDivElement> = event => {
    event.dataTransfer.effectAllowed = 'move';
    setCurrent(current);
  };

  const handleDragEnd: React.DragEventHandler<HTMLDivElement> = () => {
    setCurrent(null);
  };

  return (
    <span
      className={`${classNameForComponent(modifier)} ${className ?? ''}`}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={style}>
      {children}
    </span>
  );
};

export default Draggable;
