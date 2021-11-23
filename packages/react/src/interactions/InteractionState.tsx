import React from 'react';
import {UserInput} from '@qtikit/model/lib/user-input';

import {QtiViewerContext} from '../QtiViewer';
import {InteractionElementName} from '.';

interface InteractionState {
  [identifier: string]: string | number | boolean | undefined;
}

type InteractionStateEncoder = (userInput: UserInput[string]) => InteractionState;
type InteractionStateDecoder = (interactionState: InteractionState) => UserInput[string];

const useInteractionState = ({
  responseIdentifier,
  encode,
  decode,
  init,
  shouldUpdate,
}: {
  responseIdentifier: string;
  encode: InteractionStateEncoder;
  decode: InteractionStateDecoder;
  init?: () => InteractionState;
  shouldUpdate?: (nextInteractionState: InteractionState) => boolean;
}): [InteractionState, (newInteractionState: InteractionState) => void] => {
  const {inputState, onChange} = React.useContext(QtiViewerContext);

  return [
    React.useMemo(
      () => (inputState[responseIdentifier] || !init ? encode(inputState[responseIdentifier] ?? []) : init()),
      [inputState, responseIdentifier, encode, init]
    ),
    React.useCallback(
      (newInteractionState: InteractionState) => {
        if (!shouldUpdate || shouldUpdate(newInteractionState)) {
          onChange({
            ...inputState,
            [responseIdentifier]: decode(newInteractionState),
          });
        }
      },
      [onChange, inputState, responseIdentifier, decode, shouldUpdate]
    ),
  ];
};

const InteractionStateContext = React.createContext<{
  interactionElementName?: InteractionElementName;
  interactionState: InteractionState;
  setInteractionState: (newInteractionState: InteractionState, prevInteractionState?: InteractionState) => void;
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
