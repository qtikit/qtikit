import * as React from 'react';
import {GapTextCharacteristics as GapTextProps} from '@qtikit/model/lib/qti2_2';

import {Draggable} from './DragDrop';
import {useInteractionStateContext} from '../interactions/InteractionState';

const gapTextStyle = {
  width: '120px',
  height: '30px',
  padding: '3px 6px',
  border: '1px solid black',
  backgroundColor: '#fff',
};

const GapText: React.FC<GapTextProps | any> = ({identifier, children}) => {
  const {interactionState} = useInteractionStateContext();

  if (Object.values(interactionState).includes(identifier)) {
    return null;
  }

  return (
    <Draggable current={{name: children, value: identifier}}>
      <span style={gapTextStyle}>{children}</span>
    </Draggable>
  );
};

export default GapText;
