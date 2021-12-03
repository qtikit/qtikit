import React from 'react';
import {BaseSequenceXBaseCharacteristics, GapCharacteristics} from '@qtikit/model/lib/qti2_2';

import {CharsToProps} from '../types/props';
import {useInteractionStateContext} from '../interactions/InteractionState';
import {Current, Droppable} from './DragDrop';
import {classNameForComponent} from '../utils/style';

type GapProps = CharsToProps<BaseSequenceXBaseCharacteristics, GapCharacteristics>;

const Gap: React.FC<GapProps> = ({identifier, children}) => {
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
    <Droppable className={classNameForComponent('gap')} onDrop={handleDrop}>
      {dropped}
      {children}
    </Droppable>
  );
};

export default Gap;
