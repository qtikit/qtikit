import React from 'react';
import {GapTextCharacteristics as GapTextProps} from '@qtikit/model/lib/qti2_2';

import {useInteractionStateContext} from '../interactions/InteractionState';
import {Draggable} from './DragDrop';
import {classNameForComponent} from '../utils/style';

const GapText: React.FC<GapTextProps | any> = ({identifier, children}) => {
  const {interactionState} = useInteractionStateContext();

  if (Object.values(interactionState).includes(identifier)) {
    return null;
  }

  return (
    <Draggable className={classNameForComponent('gap-text')} current={{value: identifier, node: children}}>
      {children}
    </Draggable>
  );
};

export default GapText;
