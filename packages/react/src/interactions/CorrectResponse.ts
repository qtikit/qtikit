import React, {useContext} from 'react';

import {ViewContext} from '../views/View';

const CorrectResponseStateContext = React.createContext<{
  responseIdentifier: string;
}>(null as any);

const useCorrectResponseContext = () => {
  const {
    options,
    document: {responseDeclarations},
  } = useContext(ViewContext);
  const context = useContext(CorrectResponseStateContext);

  if (!context) {
    throw new Error('useCorrectResponseContext must be used within a CorrectResponseStateContext');
  }

  return React.useMemo(
    () => (options?.showCorrectResponse ? responseDeclarations[context.responseIdentifier] : null),
    [context.responseIdentifier, options?.showCorrectResponse, responseDeclarations]
  );
};

export default CorrectResponseStateContext;

export {useCorrectResponseContext};
