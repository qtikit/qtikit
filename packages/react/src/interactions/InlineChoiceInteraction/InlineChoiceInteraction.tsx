import React from 'react';
import {InlineChoiceInteractionCharacteristics as InlineChoiceInteractionProps} from '@qtikit/model/lib/qti2_2';

import InteractionStateContext, {useInteractionState} from '../InteractionState';
import InlineChoice from '../../components/InlineChoice';

const IDENTIFIER = 'select';

const InlineChoiceInteraction: React.FC<InlineChoiceInteractionProps | any> = ({
  responseIdentifier,
  elementChildren,
}) => {
  const [interactionState, setInteractionState] = useInteractionState({
    responseIdentifier,
    encode: userInput => ({[IDENTIFIER]: userInput[0] ?? ''}),
    decode: interactionState => [interactionState[IDENTIFIER] as string],
  });

  return (
    <span className={'qtikit-interaction qtikit-interaction__inline-choice'}>
      <InteractionStateContext.Provider value={{interactionState, setInteractionState}}>
        <InlineChoice identifier={IDENTIFIER} elementChildren={elementChildren} />
      </InteractionStateContext.Provider>
    </span>
  );
};

export default InlineChoiceInteraction;
