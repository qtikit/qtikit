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
  shouldUpdate?: (nextInteractionState: InteractionState, prevIteractionState: InteractionState) => boolean;
}): [InteractionState, (nextInteractionState: InteractionState) => void] => {
  const {inputState, onChange} = React.useContext(QtiViewerContext);

  return [
    React.useMemo(
      () => (inputState[responseIdentifier] || !init ? encode(inputState[responseIdentifier] ?? []) : init()),
      [inputState, responseIdentifier, encode, init]
    ),
    React.useCallback(
      (nextInteractionState: InteractionState, prevIteractionState?: InteractionState) => {
        if (!shouldUpdate || shouldUpdate(nextInteractionState, prevIteractionState || {})) {
          onChange &&
            onChange({
              ...inputState,
              [responseIdentifier]: decode(nextInteractionState),
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
  setInteractionState: (nextInteractionState: InteractionState, prevIteractionState?: InteractionState) => void;
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
