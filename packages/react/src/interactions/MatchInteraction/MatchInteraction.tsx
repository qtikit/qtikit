import React from 'react';
import {BasePromptInteractionCharacteristics, MatchInteractionCharacteristics} from '@qtikit/model/lib/qti2_2';

import {QtiModelProps} from '../../types/props';
import Prompt, {PromptProps} from '../../components/Prompt';
import InteractionStateContext, {useInteractionState} from '../InteractionState';
import MatchSet from './MatchSet';
import MatchTable from '../../components/MatchTable';
import {classNameForInteraction} from '../../utils/style';

export type MatchInteractionProps = QtiModelProps<
  BasePromptInteractionCharacteristics,
  MatchInteractionCharacteristics & {elementChildren: Element}
>;

const MatchInteraction: React.FC<MatchInteractionProps> = ({responseIdentifier, maxAssociations, elementChildren}) => {
  const matchSet = React.useMemo(
    () => new MatchSet(maxAssociations ? parseInt(maxAssociations) : 1, elementChildren),
    []
  );

  const [interactionState, setInteractionState] = useInteractionState({
    responseIdentifier,
    encode: userInput =>
      userInput.reduce((interactionState, identifier) => ({...interactionState, [identifier]: true}), {}),
    decode: interactionState => Object.keys(interactionState).filter(identifier => interactionState[identifier]),
    shouldUpdate: newInteractionState => {
      const current = Object.entries(interactionState);
      const next = Object.entries(newInteractionState);
      const [choice, checked] = next.filter(([response, checked]) =>
        current.length < next.length ? !interactionState[response] : checked !== interactionState[response]
      )[0];
      const [rowIdentifier, colIdentifier] = choice.split(' ');

      return checked ? matchSet.check(rowIdentifier, colIdentifier) : matchSet.uncheck(rowIdentifier, colIdentifier);
    },
  });

  const promptElement = elementChildren.querySelector('prompt');
  const promptProps: PromptProps = Object.values(promptElement?.attributes ?? {}).map(attribute => attribute.value);

  return (
    <div className={classNameForInteraction('match')}>
      <Prompt {...promptProps}>{promptElement?.textContent}</Prompt>
      <InteractionStateContext.Provider value={{interactionState, setInteractionState}}>
        <MatchTable set={matchSet} />
      </InteractionStateContext.Provider>
    </div>
  );
};

export default MatchInteraction;
