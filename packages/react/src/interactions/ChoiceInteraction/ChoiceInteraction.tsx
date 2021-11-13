import React, {useEffect} from 'react';
import {ChoiceInteractionCharacteristics as ChoiceInteractionProps} from '@qtikit/model/lib/qti2_2';

import {InteractionResponse, InteractionResponseContext} from '../InteractionResponseContext';

const ChoiceInteraction: React.FC<ChoiceInteractionProps | any> = props => {
  const [response, setResponse] = React.useState<InteractionResponse>({});

  useEffect(() => {
    console.log('response', response);
  }, [response]);

  return (
    <InteractionResponseContext.Provider value={{setResponse, response}}>
      <div>{props.children}</div>
    </InteractionResponseContext.Provider>
  );
};

export default ChoiceInteraction;
