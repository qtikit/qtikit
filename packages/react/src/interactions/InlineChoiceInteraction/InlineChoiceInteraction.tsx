import React from 'react';
import {BaseSequenceFullCharacteristics, InlineChoiceInteractionCharacteristics} from '@qtikit/model/lib/qti2_2';

import {CharsToProps} from '../../types/props';
import {classNameForInteraction} from '../../utils/style';
import InlineChoice from '../../components/InlineChoice';
import InteractionStateContext, {useInteractionState} from '../InteractionState';

const IDENTIFIER = 'select';

type InlineChoiceInteractionProps = CharsToProps<
  BaseSequenceFullCharacteristics,
  InlineChoiceInteractionCharacteristics
>;

const InlineChoiceInteraction: React.FC<InlineChoiceInteractionProps> = ({responseIdentifier, elementChildren}) => {
  const [interactionState, setInteractionState] = useInteractionState({
    responseIdentifier,
    encode: userInput => ({[IDENTIFIER]: userInput[0] ?? ''}),
    decode: interactionState => [interactionState[IDENTIFIER] as string],
  });

  return (
    <span className={classNameForInteraction('inline-choice')}>
      <InteractionStateContext.Provider value={{interactionState, setInteractionState}}>
        <InlineChoice identifier={IDENTIFIER} elementChildren={elementChildren} />
      </InteractionStateContext.Provider>
    </span>
  );
};

export default InlineChoiceInteraction;
