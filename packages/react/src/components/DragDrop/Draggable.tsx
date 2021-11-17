import * as React from 'react';

import {Current, useDragDropContext} from '.';

const draggableStyle = {
  cursor: 'move',
  display: 'inline-block',
};

export interface DraggableProps {
  current: Current;
}

const Draggable: React.FC<DraggableProps> = ({current, children}) => {
  const {setCurrent} = useDragDropContext();

  const handleDragStart: React.DragEventHandler<HTMLDivElement> = () => {
    setCurrent(current);
  };

  return (
    <div draggable onDragStart={handleDragStart} style={draggableStyle}>
      {children}
    </div>
  );
};

export default Draggable;
