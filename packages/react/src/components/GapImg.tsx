import React from 'react';
import {BaseSequenceCharacteristics, GapImgCharacteristics} from '@qtikit/model/lib/qti2_2';

import {CharsToProps} from '../types/props';
import {useInteractionStateContext} from '../interactions/InteractionState';
import {Draggable} from './DragDrop';
import {classNameForComponent} from '../utils/style';

type GapImgProps = CharsToProps<BaseSequenceCharacteristics, GapImgCharacteristics>;

const GapImg: React.FC<GapImgProps> = ({identifier, children}) => {
  const {interactionState} = useInteractionStateContext();

  if (Object.values(interactionState).includes(identifier)) {
    return null;
  }

  return (
    <Draggable className={classNameForComponent('gap-img')} current={{value: identifier, node: children}}>
      {children}
    </Draggable>
  );
};

export default GapImg;
