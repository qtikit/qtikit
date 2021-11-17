import * as React from 'react';
import {GapMatchInteractionCharacteristics as GapMatchInteractionProps} from '@qtikit/model/lib/qti2_2';

import {QtiViewerContext} from '../../QtiViewer';
import InteractionResponseContext, {
  InteractionResponse,
  InteractionResponseEncoder,
  InteractionResponseDecoder,
} from '../InteractionResponseContext';
import {DragDropContextProvider} from '../../components/DragDrop';

const SEPARATOR = ' ';

const encodeResponse: InteractionResponseEncoder = userInput =>
  userInput.reduce((interactionResponse, input) => {
    const [value, key] = input.split(SEPARATOR);

    return {...interactionResponse, [key]: value};
  }, {});
const decodeResponse: InteractionResponseDecoder = interactionResponse =>
  Object.entries(interactionResponse).map(entry => entry.reverse().join(SEPARATOR));

const GapMatchInteraction: React.FC<GapMatchInteractionProps | any> = ({responseIdentifier, ...props}) => {
  const {inputState, onChange} = React.useContext(QtiViewerContext);

  console.log(inputState);

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
      <DragDropContextProvider>{props.children}</DragDropContextProvider>
    </InteractionResponseContext.Provider>
  );
};

export default GapMatchInteraction;
