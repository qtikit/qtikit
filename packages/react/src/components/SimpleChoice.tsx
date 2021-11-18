import * as React from 'react';
import {SimpleChoiceCharacteristics as SimpleChoiceProps} from '@qtikit/model/lib/qti2_2';

import {useInteractionStateContext} from '../interactions/InteractionState';

const SimpleChoice: React.FC<SimpleChoiceProps | any> = ({identifier, children}) => {
  const {interactionState, setInteractionState} = useInteractionStateContext();

  const handleChange = () => {
    setInteractionState({
      [identifier]: true,
    });
  };

  return (
    <div>
      <input type="radio" checked={interactionState[identifier] === true} value={identifier} onChange={handleChange} />
      <label>{children}</label>
    </div>
  );
};

export default SimpleChoice;
