import React from 'react';
import {InlineChoiceInteractionCharacteristics as InlineChoiceInteractionProps} from '@qtikit/model/lib/qti2_2';

import {QtiViewerContext} from '../../QtiViewer';
import {
  InteractionResponse,
  InteractionResponseEncoder,
  InteractionResponseDecoder,
} from '../InteractionResponseContext';

const IDENTIFIER = 'select';

const encodeResponse: InteractionResponseEncoder = userInput => ({[IDENTIFIER]: userInput.join()});
const decodeResponse: InteractionResponseDecoder = interactionResponse => [interactionResponse[IDENTIFIER] as string];

const InlineChoiceInteraction: React.FC<InlineChoiceInteractionProps | any> = ({
  responseIdentifier,
  shuffle,
  required,
  ...props
}) => {
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

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = ({target: {value}}) => {
    setInteractionResponse({[IDENTIFIER]: value});
  };

  return (
    <select value={interactionResponse[IDENTIFIER] as string} onChange={handleChange}>
      <option value="">Choose...</option>
      {props.children}
    </select>
  );
};

export default InlineChoiceInteraction;
