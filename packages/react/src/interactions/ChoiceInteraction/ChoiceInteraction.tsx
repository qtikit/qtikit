import React, {useContext, useEffect} from 'react';
import {ChoiceInteractionCharacteristics as ChoiceInteractionProps} from '@qtikit/model/lib/qti2_2';
import {UserInput} from '@qtikit/model/lib/user-input';

import {QtiViewerContext} from '../../QtiViewer';
import {useInteractionResponseContext} from '../InteractionResponseContext';

const ChoiceInteraction: React.FC<ChoiceInteractionProps | any> = ({responseIdentifier, ...props}) => {
  const {onChange} = useContext(QtiViewerContext);
  const {response} = useInteractionResponseContext();

  useEffect(() => {
    const choice = Object.keys(response);
    if (choice.length > 0) {
      const userInput: UserInput = {};
      userInput[responseIdentifier] = choice;
      onChange(userInput);
    }
  }, [onChange, response, responseIdentifier]);

  return <div>{props.children}</div>;
};

export default ChoiceInteraction;
