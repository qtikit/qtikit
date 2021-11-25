import React from 'react';

import {Current, useDragDropContext} from '.';
import {createStyle} from '../../utils/style';

const draggableStyle = createStyle({
  cursor: 'move',
  display: 'inline-flex',
});

export interface DraggableProps {
  current: Omit<Current, 'name'> & Partial<Pick<Current, 'name'>>;
  style?: React.CSSProperties;
}

const Draggable: React.FC<DraggableProps> = ({current: optionalCurrent, style, children}) => {
  const {setCurrent} = useDragDropContext();

  const current = {...optionalCurrent, name: optionalCurrent.name ?? optionalCurrent.value};

  const handleDragStart: React.DragEventHandler<HTMLDivElement> = () => {
    setCurrent(current);
  };

  const handleDragEnd: React.DragEventHandler<HTMLDivElement> = () => {
    setCurrent(null);
  };

  return (
    <span draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd} style={{...draggableStyle, ...style}}>
      {children}
    </span>
  );
};

export default Draggable;
