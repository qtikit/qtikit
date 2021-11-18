import * as React from 'react';
import {HotTextInteractionCharacteristics as HottextInteractionProps} from '@qtikit/model/lib/qti2_2';

import InteractionStateContext, {useInteractionState} from '../InteractionState';

const HottextInteraction: React.FC<HottextInteractionProps | any> = ({responseIdentifier, ...props}) => {
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

export default HottextInteraction;
