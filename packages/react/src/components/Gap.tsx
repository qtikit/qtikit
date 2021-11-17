import * as React from 'react';
import {GapCharacteristics as GapProps} from '@qtikit/model/lib/qti2_2';

import {useInteractionResponseContext} from '../interactions/InteractionResponseContext';
import {Current, Droppable} from './DragDrop';

const gapStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '80px',
  height: '15px',
  backgroundColor: '#ddd',
};

const Gap: React.FC<GapProps | any> = ({identifier, children}) => {
  const {interactionResponse, setInteractionResponse} = useInteractionResponseContext();

  const [dropped, setDropped] = React.useState('');

  const handleDrop = (current: Current) => {
    setInteractionResponse({
      ...interactionResponse,
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
