import * as React from 'react';
import {UserInput} from '@qtikit/model/lib/user-input';

import {QtiViewerContext} from '../QtiViewer';

interface InteractionState {
  [identifier: string]: string | number | boolean | undefined;
}

type InteractionStateEncoder = (userInput: UserInput[string]) => InteractionState;
type InteractionStateDecoder = (interactionState: InteractionState) => UserInput[string];

const useInteractionState = ({
  responseIdentifier,
  interactionStateEncoder,
  interactionStateDecoder,
}: {
  responseIdentifier: string;
  interactionStateEncoder: InteractionStateEncoder;
  interactionStateDecoder: InteractionStateDecoder;
}): [InteractionState, (interactionState: InteractionState) => void] => {
  const {inputState, onChange} = React.useContext(QtiViewerContext);

  return [
    React.useMemo(
      () => interactionStateEncoder(inputState[responseIdentifier] ?? []),
      [inputState, interactionStateEncoder, responseIdentifier]
    ),
    React.useCallback(
      (newInteractionState: InteractionState) => {
        onChange({
          ...inputState,
          [responseIdentifier]: interactionStateDecoder(newInteractionState),
        });
      },
      [inputState, interactionStateDecoder, onChange, responseIdentifier]
    ),
  ];
};

const InteractionStateContext = React.createContext<{
  interactionState: InteractionState;
  setInteractionState: (interactionState: InteractionState) => void;
}>(null as any);

const useInteractionStateContext = () => {
  const context = React.useContext(InteractionStateContext);

  if (!context) {
    throw new Error('useInteractionStateContext must be used within a InteractionStateContext');
  }

  return context;
};

export default InteractionStateContext;
export {
  InteractionState,
  InteractionStateEncoder,
  InteractionStateDecoder,
  useInteractionState,
  useInteractionStateContext,
};
