import React from 'react';
import {GapTextCharacteristics as GapTextProps} from '@qtikit/model/lib/qti2_2';

import {useInteractionStateContext} from '../interactions/InteractionState';
import {Draggable} from './DragDrop';

const GapImg: React.FC<GapTextProps | any> = ({identifier, children}) => {
  const {interactionState} = useInteractionStateContext();

  if (Object.values(interactionState).includes(identifier)) {
    return null;
  }

  return (
    <Draggable className={'qtikit-component__gap-img'} current={{value: identifier, node: children}}>
      {children}
    </Draggable>
  );
};

export default GapImg;
