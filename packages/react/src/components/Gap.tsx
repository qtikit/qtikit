import React from 'react';
import {GapCharacteristics as GapProps} from '@qtikit/model/lib/qti2_2';

import {useInteractionStateContext} from '../interactions/InteractionState';
import {Current, Droppable} from './DragDrop';
import {createStyle} from '../utils/style';

const gapStyle = createStyle({
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '80px',
  height: '15px',
  marginRight: '0.2em',
  verticalAlign: 'middle',
  backgroundColor: '#ddd',
});

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
    <Droppable style={gapStyle} onDrop={handleDrop}>
      {dropped}
      {children}
    </Droppable>
  );
};

export default Gap;
