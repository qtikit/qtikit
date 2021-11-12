import React, {useEffect} from 'react';
import {ChoiceInteractionCharacteristics as ChoiceInteractionProps} from '@qtikit/model/src/qti2_2';

import {useInteractionResponseContext} from '../InteractionResponseContext';

const ChoiceInteraction: React.FC<ChoiceInteractionProps | any> = props => {
  const {response} = useInteractionResponseContext();

  useEffect(() => {
    console.log('response', response);
  }, [response]);

  return <div>{props.children}</div>;
};

export default ChoiceInteraction;
