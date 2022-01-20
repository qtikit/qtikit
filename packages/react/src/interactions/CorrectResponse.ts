import React, {useContext} from 'react';

import {QtiViewerContext} from '../QtiViewer';

const CorrectResponseStateContext = React.createContext<{
  responseIdentifier: string;
}>(null as any);

const useCorrectResponseContext = () => {
  const {correctResponses} = useContext(QtiViewerContext);
  const context = React.useContext(CorrectResponseStateContext);

  if (!context) {
    throw new Error('useCorrectResponseContext must be used within a CorrectResponseStateContext');
  }

  return React.useMemo(
    () => correctResponses && correctResponses[context.responseIdentifier],
    [context.responseIdentifier, correctResponses]
  );
};

export default CorrectResponseStateContext;

export {useCorrectResponseContext};
