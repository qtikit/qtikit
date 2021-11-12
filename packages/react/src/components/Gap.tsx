import React from 'react';
import {GapCharacteristics as GapProps} from '@qtikit/model/src/qti2_2';

import {useInteractionResponseContext} from '../interactions/InteractionResponseContext';
import {Current, Droppable} from './DragDrop';

const Gap: React.FC<GapProps | any> = ({identifier, children}) => {
  const {response, setResponse} = useInteractionResponseContext();

  const [dropped, setDropped] = React.useState('');

  const handleDrop = (current: Current) => {
    setResponse({
      ...response,
      [identifier]: current.value,
    });
    setDropped(current.name);
  };

  return (
    <Droppable onDrop={handleDrop}>
      <span
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '80px',
          height: '15px',
          backgroundColor: '#ddd',
        }}>
        {dropped}
        {children}
      </span>
    </Droppable>
  );
};

export default Gap;
