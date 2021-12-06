import * as React from 'react';

import {useInteractionStateContext} from '../interactions/InteractionState';

interface SelectProps {
  indentifier: string;
}

const Select: React.FC<SelectProps | any> = ({identifier, children}) => {
  const {interactionState, setInteractionState} = useInteractionStateContext();

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = ({target: {value}}) => {
    setInteractionState({[identifier]: value});
  };

  return (
    <span className={'qtikit-component__select'}>
      <select value={interactionState[identifier] as string} onChange={handleChange}>
        <option value="">Choose...</option>
        {children}
      </select>
    </span>
  );
};

export default Select;
