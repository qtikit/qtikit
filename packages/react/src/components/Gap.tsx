import React from 'react';
import {GapCharacteristics as GapProps} from '@qtikit/model/lib/qti2_2';

import {useInteractionStateContext} from '../interactions/InteractionState';
import {Current, Droppable} from './DragDrop';
import {createStyle} from '../utils/style';

const gapStyle = createStyle({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '80px',
  height: '15px',
  backgroundColor: '#ddd',
});

const Gap: React.FC<GapProps | any> = ({identifier, children}) => {
  const {interactionState, setInteractionState} = useInteractionStateContext();

  const [dropped, setDropped] = React.useState('');

  const handleDrop = (current: Current) => {
    setInteractionState({
      ...interactionState,
      [identifier]: current.value,
    });
    setDropped(current.name);
  };

  return (
    <Droppable onDrop={handleDrop}>
      <span style={gapStyle}>
        {dropped}
        {children}
      </span>
    </Droppable>
  );
};

export default Gap;
