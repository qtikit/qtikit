import React from 'react';

import {useInteractionStateContext} from '../interactions/InteractionState';
import {classNameForComponent} from '../utils/style';

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
    <span className={classNameForComponent('checkbox')}>
      <input type="checkbox" checked={interactionState[indentifier] === true} onChange={handleChange} />
    </span>
  );
};

export default Checkbox;
