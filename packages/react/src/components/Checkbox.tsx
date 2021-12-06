import React from 'react';

import {useInteractionStateContext} from '../interactions/InteractionState';

interface CheckboxProps {
  indentifier: string;
}

const Checkbox: React.FC<CheckboxProps> = ({indentifier}) => {
  const {interactionState, setInteractionState} = useInteractionStateContext();

  const handleChange = () => {
    setInteractionState({
      ...interactionState,
      [indentifier]: !(interactionState[indentifier] === true),
    });
  };

  return (
    <span className={'qtikit-component__checkbox'}>
      <input type="checkbox" checked={interactionState[indentifier] === true} onChange={handleChange} />
    </span>
  );
};

export default Checkbox;
