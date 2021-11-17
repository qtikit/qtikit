import React from 'react';
import {ExtendedTextInteractionCharacteristics as ExtendedTextInteractionProps} from '@qtikit/model/lib/qti2_2';

import {getPlaceHolder} from '../../utils/interaction';
import {QtiViewerContext} from '../../QtiViewer';
import {
  InteractionResponse,
  InteractionResponseEncoder,
  InteractionResponseDecoder,
} from '../InteractionResponseContext';

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

const encodeResponse: InteractionResponseEncoder = userInput => ({[IDENTIFIER]: userInput.join()});
const decodeResponse: InteractionResponseDecoder = interactionResponse => [interactionResponse[IDENTIFIER] as string];

const ExtendedTextInteraction: React.FC<ExtendedTextInteractionProps | any> = ({responseIdentifier, ...props}) => {
  const {inputState, onChange} = React.useContext(QtiViewerContext);

  const [interactionResponse, setInteractionResponse] = [
    React.useMemo(() => encodeResponse(inputState[responseIdentifier] ?? []), [inputState, responseIdentifier]),
    React.useCallback(
      (newInteractionResponse: InteractionResponse) => {
        onChange({
          ...inputState,
          [responseIdentifier]: decodeResponse(newInteractionResponse),
        });
      },
      [inputState, onChange, responseIdentifier]
    ),
  ];

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = ({target: {value}}) => {
    setInteractionResponse({[IDENTIFIER]: validate(value)});
  };

  return (
    <>
      {props.children}
      <div style={textareaBlockStyle}>
        <textarea
          placeholder={getPlaceHolder(props)}
          style={textareaStyle}
          onChange={handleChange}
          value={interactionResponse[IDENTIFIER] as string}></textarea>
      </div>
    </>
  );
};

export default ExtendedTextInteraction;
