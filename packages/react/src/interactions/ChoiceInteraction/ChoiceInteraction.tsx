import React from 'react';
import {ChoiceInteractionCharacteristics as ChoiceInteractionProps} from '@qtikit/model/lib/qti2_2';

import {QtiViewerContext} from '../../QtiViewer';
import InteractionStateContext, {
  InteractionState,
  InteractionStateEncoder,
  InteractionStateDecoder,
} from '../InteractionStateContext';

const encodeResponse: InteractionStateEncoder = userInput =>
  userInput.reduce((interactionState, identifier) => ({...interactionState, [identifier]: true}), {});
const decodeResponse: InteractionStateDecoder = interactionState => Object.keys(interactionState);

const ChoiceInteraction: React.FC<ChoiceInteractionProps | any> = ({responseIdentifier, ...props}) => {
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
    <InteractionStateContext.Provider value={{interactionState, setInteractionState}}>
      {props.children}
    </InteractionStateContext.Provider>
  );
};

export default ChoiceInteraction;
