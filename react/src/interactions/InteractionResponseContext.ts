import React from "react";

export interface InteractionResponse {
  [identifier: string]: string | number | boolean | undefined;
}

export const InteractionResponseContext = React.createContext<{
  response: InteractionResponse;
  setResponse: React.Dispatch<React.SetStateAction<InteractionResponse>>;
}>(null as any);
