import * as React from 'react';

interface InteractionResponse {
  [identifier: string]: string | number | boolean | undefined;
}

const InteractionResponseContext = React.createContext<{
  response: InteractionResponse;
  setResponse: React.Dispatch<React.SetStateAction<InteractionResponse>>;
}>(null as any);

const InteractionResponseContextProvider: React.FC = ({children}) => {
  const [response, setResponse] = React.useState<InteractionResponse>({});

  return (
    <InteractionResponseContext.Provider value={{response, setResponse}}>
      {children}
    </InteractionResponseContext.Provider>
  );
};

const useInteractionResponseContext = () => {
  const context = React.useContext(InteractionResponseContext);

  if (!context) {
    throw new Error('useInteractionResponseContext must be used within a InteractionResponseContext');
  }

  return context;
};

export default InteractionResponseContext;
export {InteractionResponse, InteractionResponseContextProvider, useInteractionResponseContext};
