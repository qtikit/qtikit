import React from 'react';
import {BaseSequenceCharacteristics, GapTextCharacteristics} from '@qtikit/model/lib/qti2_2';

import {QtiModelProps} from '../types/props';
import {useInteractionStateContext} from '../interactions/InteractionState';
import {Draggable} from './DragDrop';
import {classNameForComponent} from '../utils/style';

export type GapTextProps = QtiModelProps<BaseSequenceCharacteristics, GapTextCharacteristics>;

const GapText: React.FC<GapTextProps> = ({identifier, children}) => {
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
