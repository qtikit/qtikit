import React from 'react';
import {TextEntryInteractionCharacteristics as TextEntryInteractionProps} from '@qtikit/model/lib/qti2_2';

import TextEntry from '../../components/TextEntry';
import {getPlaceHolder} from '../../utils/interaction';
import InteractionStateContext, {useInteractionState} from '../InteractionState';
import {classNameForInteraction} from '../../utils/style';

const IDENTIFIER = 'text';

const TextEntryInteraction: React.FC<TextEntryInteractionProps | any> = ({responseIdentifier, ...props}) => {
  const [interactionState, setInteractionState] = useInteractionState({
    responseIdentifier,
    encode: userInput => ({[IDENTIFIER]: userInput[0] ?? ''}),
    decode: interactionState => [interactionState[IDENTIFIER] as string],
  });

  return (
    <div className={classNameForInteraction('textentry')}>
      <InteractionStateContext.Provider value={{interactionState, setInteractionState}}>
        <TextEntry identifier={IDENTIFIER} placeholder={getPlaceHolder(props)} />
      </InteractionStateContext.Provider>
    </div>
  );
};

export default TextEntryInteraction;
