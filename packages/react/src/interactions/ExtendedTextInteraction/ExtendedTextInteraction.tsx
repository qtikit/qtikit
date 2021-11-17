import React from 'react';
import {ExtendedTextInteractionCharacteristics as ExtendedTextInteractionProps} from '@qtikit/model/lib/qti2_2';

import {getPlaceHolder} from '../../utils/interaction';
import {useInteractionState} from '../InteractionState';

const IDENTIFIER = 'textarea';

const validate = (value: string) => {
  return value;
};

const textareaBlockStyle = {
  display: 'flex',
};

const textareaStyle = {
  width: '90%',
  marginTop: '1em',
  height: '14em',
};

const ExtendedTextInteraction: React.FC<ExtendedTextInteractionProps | any> = ({responseIdentifier, ...props}) => {
  const [interactionState, setInteractionState] = useInteractionState({
    responseIdentifier,
    interactionStateEncoder: userInput => ({[IDENTIFIER]: userInput[0]}),
    interactionStateDecoder: interactionState => [interactionState[IDENTIFIER] as string],
  });

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = ({target: {value}}) => {
    setInteractionState({[IDENTIFIER]: validate(value)});
  };

  return (
    <>
      {props.children}
      <div style={textareaBlockStyle}>
        <textarea
          placeholder={getPlaceHolder(props)}
          style={textareaStyle}
          onChange={handleChange}
          value={interactionState[IDENTIFIER] as string}></textarea>
      </div>
    </>
  );
};

export default ExtendedTextInteraction;
