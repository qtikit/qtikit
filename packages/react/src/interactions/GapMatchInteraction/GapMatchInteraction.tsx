import React from 'react';
import {GapMatchInteractionCharacteristics as GapMatchInteractionProps} from '@qtikit/model/lib/qti2_2';

import InteractionStateContext, {useInteractionState} from '../InteractionState';
import {DragDropContextProvider} from '../../components/DragDrop';

const SEPARATOR = ' ';

const GapMatchInteraction: React.FC<GapMatchInteractionProps | any> = ({responseIdentifier, ...props}) => {
  const [interactionState, setInteractionState] = useInteractionState({
    responseIdentifier,
    encode: userInput => Object.fromEntries(userInput.map(input => input.split(SEPARATOR).reverse())),
    decode: interactionState => Object.entries(interactionState).map(entry => entry.reverse().join(SEPARATOR)),
  });

  return (
    <div className="qtikit-interaction qtikit-interaction__gap-match">
      <InteractionStateContext.Provider value={{interactionState, setInteractionState}}>
        <DragDropContextProvider>{props.children}</DragDropContextProvider>
      </InteractionStateContext.Provider>
    </div>
  );
};

export default GapMatchInteraction;
