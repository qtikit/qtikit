import React from 'react';
import {TextEntryInteractionCharacteristics as TextEntryInteractionProps} from '@qtikit/model/lib/qti2_2';

import {getPlaceHolder} from '../../utils/interaction';
import {useInteractionState} from '../InteractionState';

const IDENTIFIER = 'text';

const textStyle = {
  fontSize: '1em',
  border: 'solid 1px',
  width: '6ex',
};

const TextEntryInteraction: React.FC<TextEntryInteractionProps | any> = ({responseIdentifier, ...props}) => {
  const [interactionState, setInteractionState] = useInteractionState({
    responseIdentifier,
    interactionStateEncoder: userInput => ({[IDENTIFIER]: userInput[0]}),
    interactionStateDecoder: interactionState => [interactionState[IDENTIFIER] as string],
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({target: {value}}) => {
    setInteractionState({[IDENTIFIER]: value});
  };

  return (
    <span>
      <input
        type="text"
        style={textStyle}
        placeholder={getPlaceHolder(props)}
        value={interactionState.text as string}
        onChange={handleChange}
      />
      {props.children}
    </span>
  );
};

export default TextEntryInteraction;
