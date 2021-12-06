import * as React from 'react';
import {SimpleChoiceCharacteristics as SimpleChoiceProps} from '@qtikit/model/lib/qti2_2';

import {useInteractionStateContext} from '../interactions/InteractionState';

const Hottext: React.FC<SimpleChoiceProps | any> = ({identifier, children}) => {
  const {interactionState, setInteractionState} = useInteractionStateContext();

  const handleChange = () => {
    setInteractionState({
      [identifier]: true,
    });
  };

  return (
    <span className={'qtikit-component__hottext'}>
      <label>
        <input
          type="radio"
          checked={interactionState[identifier] === true}
          value={identifier}
          onChange={handleChange}
        />
        {children}&nbsp;
      </label>
    </span>
  );
};

export default Hottext;
