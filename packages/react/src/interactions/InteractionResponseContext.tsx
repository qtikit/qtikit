import * as React from 'react';
import {UserInput} from '@qtikit/model/lib/user-input';
interface InteractionResponse {
  [identifier: string]: string | number | boolean | undefined;
}

type InteractionResponseEncoder = (userInput: UserInput[string]) => InteractionResponse;
type InteractionResponseDecoder = (interactionResponse: InteractionResponse) => UserInput[string];

const InteractionResponseContext = React.createContext<{
  interactionResponse: InteractionResponse;
  setInteractionResponse: (interactionResponse: InteractionResponse) => void;
}>(null as any);

const useInteractionResponseContext = () => {
  const context = React.useContext(InteractionResponseContext);

  if (!context) {
    throw new Error('useInteractionResponseContext must be used within a InteractionResponseContext');
  }

  return context;
};

export default InteractionResponseContext;
export {InteractionResponse, InteractionResponseEncoder, InteractionResponseDecoder, useInteractionResponseContext};
