import React from 'react';
import {UserInput} from '@qtikit/model/lib/user-input';
import {GapMatchInteractionCharacteristics as GapMatchInteractionProps} from '@qtikit/model/lib/qti2_2';

import {QtiViewerContext} from '../../QtiViewer';
import {useInteractionResponseContext} from '../InteractionResponseContext';
import {DragDropContextProvider} from '../../components/DragDrop';

const GapMatchInteraction: React.FC<GapMatchInteractionProps | any> = ({responseIdentifier, ...props}) => {
  const {onChange} = React.useContext(QtiViewerContext);
  const {response} = useInteractionResponseContext();

  React.useEffect(() => {
    const matchedResponse = Object.entries(response).map(([key, value]) => `${value} ${key}`);
    const userInput: UserInput = {};
    userInput[responseIdentifier] = matchedResponse;
    onChange(userInput);
  }, [onChange, response, responseIdentifier]);

  return <DragDropContextProvider>{props.children}</DragDropContextProvider>;
};

export default GapMatchInteraction;
