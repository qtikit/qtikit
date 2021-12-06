import React from 'react';
import {ChoiceInteractionCharacteristics as ChoiceInteractionProps} from '@qtikit/model/lib/qti2_2';

import InteractionStateContext, {useInteractionState} from '../InteractionState';
import {classNameForInteraction} from '../../utils/style';

const ChoiceInteraction: React.FC<ChoiceInteractionProps | any> = ({responseIdentifier, ...props}) => {
  const [interactionState, setInteractionState] = useInteractionState({
    responseIdentifier,
    encode: userInput => Object.fromEntries(userInput.map(input => [input, true])),
    decode: interactionState => Object.keys(interactionState),
  });

  return (
    <div className={classNameForInteraction('choice')}>
      <InteractionStateContext.Provider value={{interactionState, setInteractionState}}>
        {props.children}
      </InteractionStateContext.Provider>
    </div>
  );
};

export default ChoiceInteraction;
