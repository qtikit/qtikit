import React from 'react';

import {Current, useDragDropContext} from '.';
import {createStyle} from '../../utils/style';

const draggableStyle = createStyle({
  cursor: 'move',
  display: 'inline-block',
});

export interface DraggableProps {
  current: Current;
}

const Draggable: React.FC<DraggableProps> = ({current, children}) => {
  const {setCurrent} = useDragDropContext();

  const handleDragStart: React.DragEventHandler<HTMLDivElement> = () => {
    setCurrent(current);
  };

  return (
    <span draggable onDragStart={handleDragStart} style={draggableStyle}>
      {children}
    </span>
  );
};

export default Draggable;
