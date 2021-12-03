import React from 'react';
import {BaseSequenceXBaseCharacteristics, TextEntryInteractionCharacteristics} from '@qtikit/model/lib/qti2_2';

import {InteractionProps} from '../../types/props';
import {classNameForInteraction} from '../../utils/style';
import {getPlaceHolder} from '../../utils/interaction';
import TextEntry from '../../components/TextEntry';
import InteractionStateContext, {useInteractionState} from '../InteractionState';

const IDENTIFIER = 'text';

type TextEntryInteractionProps = InteractionProps<
  BaseSequenceXBaseCharacteristics,
  TextEntryInteractionCharacteristics
>;

const TextEntryInteraction: React.FC<TextEntryInteractionProps> = ({
  responseIdentifier,
  placeholderText,
  expectedLength,
}) => {
  const [interactionState, setInteractionState] = useInteractionState({
    responseIdentifier,
    encode: userInput => ({[IDENTIFIER]: userInput[0] ?? ''}),
    decode: interactionState => [interactionState[IDENTIFIER] as string],
  });

  return (
    <div className={classNameForInteraction('textentry')}>
      <InteractionStateContext.Provider value={{interactionState, setInteractionState}}>
        <TextEntry identifier={IDENTIFIER} placeholder={getPlaceHolder({placeholderText, expectedLength})} />
      </InteractionStateContext.Provider>
    </div>
  );
};

export default TextEntryInteraction;
