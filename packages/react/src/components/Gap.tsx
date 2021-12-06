import React from 'react';
import {GapCharacteristics as GapProps} from '@qtikit/model/lib/qti2_2';

import {useInteractionStateContext} from '../interactions/InteractionState';
import {Current, Droppable} from './DragDrop';

const Gap: React.FC<GapProps | any> = ({identifier, children}) => {
  const {interactionState, setInteractionState} = useInteractionStateContext();

  const [dropped, setDropped] = React.useState<React.ReactNode>();

  const handleDrop = (current: Current) => {
    setInteractionState({
      ...interactionState,
      [identifier]: current.value,
    });

    setDropped(current.node);
  };

  return (
    <Droppable className={'qtikit-component__gap'} onDrop={handleDrop}>
      {dropped}
      {children}
    </Droppable>
  );
};

export default Gap;
