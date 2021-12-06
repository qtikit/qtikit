import React from 'react';
import {MatchInteractionCharacteristics as MatchInteractionProps} from '@qtikit/model/lib/qti2_2';

import Prompt from '../../components/Prompt';
import InteractionStateContext, {useInteractionState} from '../InteractionState';
import MatchSet from './MatchSet';
import MatchTable from '../../components/MatchTable';

const MatchInteraction: React.FC<MatchInteractionProps | any> = ({
  responseIdentifier,
  maxAssociations,
  elementChildren,
}) => {
  const matchSet = React.useMemo(() => new MatchSet(maxAssociations, elementChildren), []);

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

  return (
    <div className={'qtikit-interaction qtikit-interaction__match'}>
      <Prompt>{elementChildren.querySelector('prompt').textContent}</Prompt>
      <InteractionStateContext.Provider value={{interactionState, setInteractionState}}>
        <MatchTable set={matchSet} />
      </InteractionStateContext.Provider>
    </div>
  );
};

export default MatchInteraction;
