import * as React from 'react';
import {UserInput} from '@qtikit/model/lib/user-input';
interface InteractionState {
  [identifier: string]: string | number | boolean | undefined;
}

type InteractionStateEncoder = (userInput: UserInput[string]) => InteractionState;
type InteractionStateDecoder = (interactionState: InteractionState) => UserInput[string];

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
export {InteractionState, InteractionStateEncoder, InteractionStateDecoder, useInteractionStateContext};
