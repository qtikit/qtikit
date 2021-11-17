import * as React from 'react';
import {GapMatchInteractionCharacteristics as GapMatchInteractionProps} from '@qtikit/model/lib/qti2_2';

import {QtiViewerContext} from '../../QtiViewer';
import InteractionStateContext, {
  InteractionState,
  InteractionStateEncoder,
  InteractionStateDecoder,
} from '../InteractionStateContext';
import {DragDropContextProvider} from '../../components/DragDrop';

const SEPARATOR = ' ';

const encodeResponse: InteractionStateEncoder = userInput =>
  userInput.reduce((interactionState, input) => {
    const [value, key] = input.split(SEPARATOR);

    return {...interactionState, [key]: value};
  }, {});
const decodeResponse: InteractionStateDecoder = interactionState =>
  Object.entries(interactionState).map(entry => entry.reverse().join(SEPARATOR));

const GapMatchInteraction: React.FC<GapMatchInteractionProps | any> = ({responseIdentifier, ...props}) => {
  const {inputState, onChange} = React.useContext(QtiViewerContext);

  const [interactionState, setInteractionState] = [
    React.useMemo(() => encodeResponse(inputState[responseIdentifier] ?? []), [inputState, responseIdentifier]),
    React.useCallback(
      (newInteractionState: InteractionState) => {
        const choice = decodeResponse(newInteractionState);

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
    <InteractionStateContext.Provider value={{interactionState: interactionState, setInteractionState}}>
      <DragDropContextProvider>{props.children}</DragDropContextProvider>
    </InteractionStateContext.Provider>
  );
};

export default GapMatchInteraction;
