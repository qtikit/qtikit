import React from 'react';
import {BasePromptInteractionCharacteristics, ChoiceInteractionCharacteristics} from '@qtikit/model/lib/qti2_2';

import {QtiModelProps} from '../../types/props';
import {classNameForInteraction} from '../../utils/style';
import InteractionStateContext, {InteractionState, useInteractionState} from '../InteractionState';
import {parseBoolean, parseMaxChoices} from '../../utils/type';
import useShuffleAttributes from '../../characteristics/Shuffle';

const ATTRIBUTE_NAME = 'SimpleChoice';

export type ChoiceInteractionProps = QtiModelProps<
  BasePromptInteractionCharacteristics,
  ChoiceInteractionCharacteristics
>;

const ChoiceInteraction: React.FC<ChoiceInteractionProps> = ({
  responseIdentifier,
  shuffle,
  // maxChoices,
  // minChoices,
  orientation,
  children,
}) => {
  const [interactionState, setInteractionState] = useInteractionState({
    responseIdentifier,
    encode: userInput => Object.fromEntries(userInput.map(input => [input, true])),
    decode: newInteractionState =>
      Object.keys({
        ...interactionState,
        ...newInteractionState,
      }),
    shouldUpdate: (nextInteractionState: InteractionState) => {
      console.log('nextInteractionState', nextInteractionState);
      return true;
    },
  });

  const shuffledChildren = useShuffleAttributes(ATTRIBUTE_NAME, parseBoolean(shuffle), children);

  return (
    <div className={`${classNameForInteraction('choice')} ${orientation}`}>
      <InteractionStateContext.Provider value={{interactionState, setInteractionState}}>
        {shuffledChildren}
      </InteractionStateContext.Provider>
    </div>
  );
};

export default ChoiceInteraction;
