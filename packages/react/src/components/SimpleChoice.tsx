import React from 'react';
import {SimpleChoiceCharacteristics as SimpleChoiceProps} from '@qtikit/model/lib/qti2_2';

import {createStyle} from '../utils/style';
import {useInteractionStateContext} from '../interactions/InteractionState';
import {Current, Draggable, Droppable, useDragDropContext} from './DragDrop';

const OrderSimpleChoiceStyle = createStyle(({index, isDragging}: {index: number; isDragging: boolean}) => ({
  order: index,
  opacity: isDragging ? 0.01 : 1,
}));

const OrderSimpleChoice: React.FC<SimpleChoiceProps | any> = ({identifier, children}) => {
  const {interactionState, setInteractionState} = useInteractionStateContext();
  const {current} = useDragDropContext();

  const handleDragEnter = (current: Current) => {
    if (current.name === identifier) return;

    setInteractionState({
      ...interactionState,
      [current.name]: interactionState[identifier],
      [identifier]: interactionState[current.name],
    });
  };

  return (
    <div
      style={OrderSimpleChoiceStyle({
        index: Number(interactionState[identifier] ?? 0),
        isDragging: current?.name === identifier,
      })}>
      <Draggable current={{name: identifier, value: identifier}}>
        <Droppable onDragEnter={handleDragEnter}>{children}</Droppable>
      </Draggable>
    </div>
  );
};

const SimpleChoice: React.FC<SimpleChoiceProps | any> = ({identifier, children}) => {
  const {interactionState, setInteractionState} = useInteractionStateContext();

  const handleChange = () => {
    setInteractionState({
      [identifier]: true,
    });
  };

  return (
    <div>
      <input type="radio" checked={interactionState[identifier] === true} value={identifier} onChange={handleChange} />
      <label>{children}</label>
    </div>
  );
};

export default SimpleChoice;
