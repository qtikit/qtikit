import React from 'react';
import {InlineChoiceInteractionCharacteristics as InlineChoiceInteractionProps} from '@qtikit/model/lib/qti2_2';

import {useInteractionState} from '../InteractionState';

const IDENTIFIER = 'select';

const InlineChoiceInteraction: React.FC<InlineChoiceInteractionProps | any> = ({
  responseIdentifier,
  shuffle,
  required,
  ...props
}) => {
  const [interactionState, setInteractionState] = useInteractionState({
    responseIdentifier,
    encode: userInput => ({[IDENTIFIER]: userInput[0] ?? ''}),
    decode: interactionState => [interactionState[IDENTIFIER] as string],
  });

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = ({target: {value}}) => {
    setInteractionState({[IDENTIFIER]: value});
  };

  return (
    <select value={interactionState[IDENTIFIER] as string} onChange={handleChange}>
      <option value="">Choose...</option>
      {props.children}
    </select>
  );
};

export default InlineChoiceInteraction;
