import React from 'react';
import {ChoiceInteractionCharacteristics as ChoiceInteractionProps} from '@qtikit/model/lib/qti2_2';

import {QtiViewerContext} from '../../QtiViewer';
import InteractionResponseContext, {
  InteractionResponse,
  InteractionResponseEncoder,
  InteractionResponseDecoder,
} from '../InteractionResponseContext';

const encodeResponse: InteractionResponseEncoder = userInput =>
  userInput.reduce((interactionResponse, identifier) => ({...interactionResponse, [identifier]: true}), {});
const decodeResponse: InteractionResponseDecoder = interactionResponse => Object.keys(interactionResponse);

const ChoiceInteraction: React.FC<ChoiceInteractionProps | any> = ({responseIdentifier, ...props}) => {
  const {inputState, onChange} = React.useContext(QtiViewerContext);

  const [interactionResponse, setInteractionResponse] = [
    React.useMemo(() => encodeResponse(inputState[responseIdentifier] ?? []), [inputState, responseIdentifier]),
    React.useCallback(
      (newInteractionResponse: InteractionResponse) => {
        const choice = decodeResponse(newInteractionResponse);

        if (choice.length > 0) {
          onChange({
            ...inputState,
            [responseIdentifier]: choice,
          });
        }
      },
      [inputState, onChange, responseIdentifier]
    ),
  ];

  return (
    <InteractionResponseContext.Provider value={{interactionResponse, setInteractionResponse}}>
      {props.children}
    </InteractionResponseContext.Provider>
  );
};

export default ChoiceInteraction;
