import React from 'react';
import {BasePromptInteractionCharacteristics, MatchInteractionCharacteristics} from '@qtikit/model/lib/qti2_2';
import {UserInput} from '@qtikit/model/lib/user-input';

import {QtiModelProps} from '../../types/props';
import Prompt, {PromptProps} from '../../components/Prompt';
import InteractionStateContext, {InteractionState, useInteractionState} from '../InteractionState';
import {classNameForInteraction} from '../../utils/style';
import {parseBoolean} from '../../utils/type';
import SimpleMatchSet, {useSimpleMatchSet} from '../../components/SimpleMatchSet';

export type MatchInteractionProps = QtiModelProps<
  BasePromptInteractionCharacteristics,
  MatchInteractionCharacteristics & {elementChildren: Element}
>;

function encodeToBooleanMap(userInput: UserInput[string]): InteractionState {
  return userInput.reduce((interactionState, identifier) => ({...interactionState, [identifier]: true}), {});
}

function decodeWithValidIdentifier(interactionState: InteractionState): UserInput[string] {
  return Object.keys(interactionState).filter(identifier => interactionState[identifier]);
}

const MatchInteraction: React.FC<MatchInteractionProps> = ({
  responseIdentifier,
  maxAssociations,
  shuffle,
  elementChildren,
}) => {
  const {simpleMatchSet, checkChoice} = useSimpleMatchSet(
    elementChildren,
    Number.parseInt(maxAssociations || '0'),
    parseBoolean(shuffle)
  );

  const [interactionState, setInteractionState] = useInteractionState({
    responseIdentifier,
    encode: encodeToBooleanMap,
    decode: decodeWithValidIdentifier,
    shouldUpdate: (nextInteractionState, prevInteractionState) => {
      const changeIdentifier = Object.keys(prevInteractionState)[0];
      const checked = nextInteractionState[changeIdentifier];
      return checkChoice(changeIdentifier, checked as boolean);
    },
  });

  const promptElement = elementChildren.querySelector('prompt');
  const promptProps: PromptProps = Object.fromEntries(
    Object.entries(promptElement?.attributes ?? {}).map(([name, {value}]) => [name as any, value])
  );

  return (
    <div className={classNameForInteraction('match')}>
      <Prompt {...promptProps}>{promptElement?.textContent}</Prompt>
      <InteractionStateContext.Provider value={{interactionState, setInteractionState}}>
        <SimpleMatchSet {...simpleMatchSet} />
      </InteractionStateContext.Provider>
    </div>
  );
};

export default MatchInteraction;
