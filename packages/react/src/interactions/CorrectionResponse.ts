import React, {useContext} from 'react';

import {QtiViewerContext} from '../QtiViewer';

const CorrentResponseStateContext = React.createContext<{
  responseIdentifier: string;
}>(null as any);

const useCorrentResponseContext = () => {
  const {correctResponses} = useContext(QtiViewerContext);
  const context = React.useContext(CorrentResponseStateContext);

  if (!context) {
    throw new Error('useCorrentResponseContext must be used within a CorrentResponseStateContext');
  }

  return React.useMemo(
    () => (correctResponses ? correctResponses[context.responseIdentifier] : null),
    [context.responseIdentifier, correctResponses]
  );
};

export default CorrentResponseStateContext;

export {useCorrentResponseContext};
