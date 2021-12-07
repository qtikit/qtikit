import React from 'react';
import {ExtendedTextInteractionCharacteristics as ExtendedTextInteractionProps} from '@qtikit/model/lib/qti2_2';

import {getPlaceHolder} from '../../utils/interaction';
import {classNameForInteraction} from '../../utils/style';
import InteractionStateContext, {useInteractionState} from '../InteractionState';
import ExtendedText from '../../components/ExtendedText';

const IDENTIFIER = 'textarea';

const ExtendedTextInteraction: React.FC<ExtendedTextInteractionProps | any> = ({responseIdentifier, ...props}) => {
  const [interactionState, setInteractionState] = useInteractionState({
    responseIdentifier,
    encode: userInput => ({[IDENTIFIER]: userInput[0] ?? ''}),
    decode: interactionState => [interactionState[IDENTIFIER] as string],
  });

  return (
    <div className={classNameForInteraction('extended-text')}>
      {props.children}
      <InteractionStateContext.Provider value={{interactionState, setInteractionState}}>
        <ExtendedText identifier={IDENTIFIER} placeholder={getPlaceHolder(props)} />
      </InteractionStateContext.Provider>
    </div>
  );
};

export default ExtendedTextInteraction;
