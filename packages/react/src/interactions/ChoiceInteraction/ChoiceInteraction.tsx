import React from 'react';
import {BasePromptInteractionCharacteristics, ChoiceInteractionCharacteristics} from '@qtikit/model/lib/qti2_2';

import {CharsToProps} from '../../types/props';
import {classNameForInteraction} from '../../utils/style';
import InteractionStateContext, {useInteractionState} from '../InteractionState';

type ChoiceInteractionProps = CharsToProps<BasePromptInteractionCharacteristics, ChoiceInteractionCharacteristics>;

const ChoiceInteraction: React.FC<ChoiceInteractionProps> = ({responseIdentifier, children}) => {
  const [interactionState, setInteractionState] = useInteractionState({
    responseIdentifier,
    encode: userInput => Object.fromEntries(userInput.map(input => [input, true])),
    decode: interactionState => Object.keys(interactionState),
  });

  return (
    <div className={classNameForInteraction('choice')}>
      <InteractionStateContext.Provider value={{interactionState, setInteractionState}}>
        {children}
      </InteractionStateContext.Provider>
    </div>
  );
};

export default ChoiceInteraction;
