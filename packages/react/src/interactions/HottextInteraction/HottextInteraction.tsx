import React from 'react';
import {BasePromptInteractionCharacteristics, HotTextInteractionCharacteristics} from '@qtikit/model/lib/qti2_2';

import {QtiModelProps} from '../../types/props';
import {classNameForInteraction} from '../../utils/style';
import InteractionStateContext, {useInteractionState} from '../InteractionState';

export type HottextInteractionProps = QtiModelProps<
  BasePromptInteractionCharacteristics,
  HotTextInteractionCharacteristics
>;

const HottextInteraction: React.FC<HottextInteractionProps> = ({responseIdentifier, children}) => {
  const [interactionState, setInteractionState] = useInteractionState({
    responseIdentifier,
    encode: userInput => Object.fromEntries(userInput.map(input => [input, true])),
    decode: interactionState => Object.keys(interactionState),
  });

  return (
    <div className={classNameForInteraction('hottext')}>
      <InteractionStateContext.Provider value={{interactionState, setInteractionState}}>
        {children}
      </InteractionStateContext.Provider>
    </div>
  );
};

export default HottextInteraction;
