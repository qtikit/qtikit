import * as React from 'react';
import {SimpleChoiceCharacteristics as SimpleChoiceProps} from '@qtikit/model/lib/qti2_2';

import {useInteractionResponseContext} from '../interactions/InteractionResponseContext';

const SimpleChoice: React.FC<SimpleChoiceProps | any> = ({identifier, children}) => {
  const {interactionResponse, setInteractionResponse} = useInteractionResponseContext();

  const handleChange = () => {
    setInteractionResponse({
      [identifier]: true,
    });
  };

  return (
    <div>
      <input
        type="radio"
        checked={interactionResponse[identifier] === true}
        value={identifier}
        onChange={handleChange}
      />
      <label>{children}</label>
    </div>
  );
};

export default SimpleChoice;
