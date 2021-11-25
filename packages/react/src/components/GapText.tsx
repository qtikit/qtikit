import React from 'react';
import {GapTextCharacteristics as GapTextProps} from '@qtikit/model/lib/qti2_2';

import {createStyle} from '../utils/style';
import {useInteractionStateContext} from '../interactions/InteractionState';
import {Draggable} from './DragDrop';

const gapTextStyle = createStyle({
  padding: '3px 6px',
  border: '1px solid black',
  backgroundColor: 'white',
});

const GapText: React.FC<GapTextProps | any> = ({identifier, children}) => {
  const {interactionState} = useInteractionStateContext();

  if (Object.values(interactionState).includes(identifier)) {
    return null;
  }

  return (
    <Draggable style={gapTextStyle} current={{value: identifier, node: children}}>
      {children}
    </Draggable>
  );
};

export default GapText;
