import React from 'react';
import {GapMatchInteractionCharacteristics as GapMatchInteractionProps} from '@qtikit/model/lib/qti2_2';

import InteractionStateContext, {useInteractionState} from '../InteractionState';
import {DragDropContextProvider} from '../../components/DragDrop';

const SEPARATOR = ' ';

const GapMatchInteraction: React.FC<GapMatchInteractionProps | any> = ({responseIdentifier, ...props}) => {
  const [interactionState, setInteractionState] = useInteractionState({
    responseIdentifier,
    interactionStateEncoder: userInput =>
      userInput.reduce((interactionState, input) => {
        const [value, key] = input.split(SEPARATOR);

        return {...interactionState, [key]: value};
      }, {}),
    interactionStateDecoder: interactionState =>
      Object.entries(interactionState).map(entry => entry.reverse().join(SEPARATOR)),
  });

  return (
    <InteractionStateContext.Provider value={{interactionState, setInteractionState}}>
      <DragDropContextProvider>{props.children}</DragDropContextProvider>
    </InteractionStateContext.Provider>
  );
};

export default GapMatchInteraction;
