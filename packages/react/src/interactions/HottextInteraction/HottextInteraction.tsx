import * as React from 'react';
import {HotTextInteractionCharacteristics as HottextInteractionProps} from '@qtikit/model/lib/qti2_2';

import InteractionStateContext, {useInteractionState} from '../InteractionState';
import {classNameForInteraction} from '../../utils/style';

const HottextInteraction: React.FC<HottextInteractionProps | any> = ({responseIdentifier, ...props}) => {
  const [interactionState, setInteractionState] = useInteractionState({
    responseIdentifier,
    encode: userInput => Object.fromEntries(userInput.map(input => [input, true])),
    decode: interactionState => Object.keys(interactionState),
  });

  return (
    <div className={classNameForInteraction('hottext')}>
      <InteractionStateContext.Provider value={{interactionState, setInteractionState}}>
        {props.children}
      </InteractionStateContext.Provider>
    </div>
  );
};

export default HottextInteraction;
