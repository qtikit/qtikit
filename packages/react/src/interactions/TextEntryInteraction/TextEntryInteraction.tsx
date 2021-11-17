import React from 'react';
import {TextEntryInteractionCharacteristics as TextEntryInteractionProps} from '@qtikit/model/lib/qti2_2';

import {getPlaceHolder} from '../../utils/interaction';
import {QtiViewerContext} from '../../QtiViewer';
import {
  InteractionResponse,
  InteractionResponseEncoder,
  InteractionResponseDecoder,
} from '../InteractionResponseContext';

const IDENTIFIER = 'text';

const encodeResponse: InteractionResponseEncoder = userInput => ({[IDENTIFIER]: userInput.join()});
const decodeResponse: InteractionResponseDecoder = interactionResponse => [interactionResponse[IDENTIFIER] as string];

const textStyle = {
  fontSize: '1em',
  border: 'solid 1px',
  width: '6ex',
};

const TextEntryInteraction: React.FC<TextEntryInteractionProps | any> = ({responseIdentifier, ...props}) => {
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

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({target: {value}}) => {
    setInteractionResponse({[IDENTIFIER]: value});
  };

  return (
    <span>
      <input
        type="text"
        style={textStyle}
        placeholder={getPlaceHolder(props)}
        value={interactionResponse.text as string}
        onChange={handleChange}
      />
      {props.children}
    </span>
  );
};

export default TextEntryInteraction;
