import React from 'react';
import {ChoiceInteractionCharacteristics as ChoiceInteractionProps} from '@qtikit/model/lib/qti2_2';

import InteractionStateContext, {useInteractionState} from '../InteractionState';

const ChoiceInteraction: React.FC<ChoiceInteractionProps | any> = ({responseIdentifier, ...props}) => {
  const [interactionState, setInteractionState] = useInteractionState({
    responseIdentifier,
    interactionStateEncoder: userInput =>
      userInput.reduce((interactionState, identifier) => ({...interactionState, [identifier]: true}), {}),
    interactionStateDecoder: interactionState => Object.keys(interactionState),
  });

  return (
    <InteractionStateContext.Provider value={{interactionState, setInteractionState}}>
      {props.children}
    </InteractionStateContext.Provider>
  );
};

export default ChoiceInteraction;
