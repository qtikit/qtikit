import React from 'react';
import {BasePromptInteractionCharacteristics, GapMatchInteractionCharacteristics} from '@qtikit/model/lib/qti2_2';

import {QtiModelProps} from '../../types/props';
import {classNameForInteraction} from '../../utils/style';
import {DragDropContextProvider} from '../../components/DragDrop';
import InteractionStateContext, {useInteractionState} from '../InteractionState';

const SEPARATOR = ' ';

export type GapMatchInteractionProps = QtiModelProps<
  BasePromptInteractionCharacteristics,
  GapMatchInteractionCharacteristics
>;

const GapMatchInteraction: React.FC<GapMatchInteractionProps> = ({responseIdentifier, children}) => {
  const [interactionState, setInteractionState] = useInteractionState({
    responseIdentifier,
    encode: userInput => Object.fromEntries(userInput.map(input => input.split(SEPARATOR).reverse())),
    decode: interactionState => Object.entries(interactionState).map(entry => entry.reverse().join(SEPARATOR)),
  });

  return (
    <div className={classNameForInteraction('gap-match')}>
      <InteractionStateContext.Provider value={{interactionState, setInteractionState}}>
        <DragDropContextProvider>{children}</DragDropContextProvider>
      </InteractionStateContext.Provider>
    </div>
  );
};

export default GapMatchInteraction;
