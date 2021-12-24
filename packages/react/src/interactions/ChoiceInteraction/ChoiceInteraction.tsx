import React from 'react';
import {BasePromptInteractionCharacteristics, ChoiceInteractionCharacteristics} from '@qtikit/model/lib/qti2_2';
import {UserInput} from '@qtikit/model/lib/user-input';

import {QtiModelProps} from '../../types/props';
import {classNameForInteraction} from '../../utils/style';
import InteractionStateContext, {InteractionState, useInteractionState} from '../InteractionState';
import {parseBoolean, parseMaxChoices} from '../../utils/type';
import useShuffleAttributes from '../../characteristics/Shuffle';
import OrientationCharacteristic from '../../characteristics/Orientation';

export type ChoiceInteractionProps = QtiModelProps<
  BasePromptInteractionCharacteristics,
  ChoiceInteractionCharacteristics
>;

function decodeChoices(choices: {[s: string]: unknown}) {
  return Object.entries(choices)
    .filter(([, value]) => value === true)
    .map(([key]) => key);
}

function encodeChoices(userInput: UserInput[string]) {
  return Object.fromEntries(userInput.map(input => [input, true]));
}

function checkMaxChoices(
  interactionState: InteractionState,
  nextInteractionState: InteractionState,
  maxChoice: number
) {
  const checked = Object.entries(nextInteractionState)[0][1];
  const length = Object.entries(interactionState).filter(([, value]) => value === checked).length;

  return !checked || maxChoice === 0 || length < maxChoice;
}

const ChoiceInteraction: React.FC<ChoiceInteractionProps> = ({
  responseIdentifier,
  shuffle,
  maxChoices,
  orientation,
  children,
}) => {
  const {prompt, shuffledChildren} = useShuffleAttributes(parseBoolean(shuffle), children);

  const [interactionState, setInteractionState] = useInteractionState({
    responseIdentifier,
    encode: userInput => encodeChoices(userInput),
    decode: newInteractionState => decodeChoices({...interactionState, ...newInteractionState}),
    shouldUpdate: (nextInteractionState: InteractionState) =>
      checkMaxChoices(interactionState, nextInteractionState, parseMaxChoices(maxChoices)),
  });

  return (
    <div className={`${classNameForInteraction('choice')}`}>
      {prompt}
      <InteractionStateContext.Provider value={{interactionState, setInteractionState}}>
        <OrientationCharacteristic orientation={orientation}>{shuffledChildren}</OrientationCharacteristic>
      </InteractionStateContext.Provider>
    </div>
  );
};

export default ChoiceInteraction;
