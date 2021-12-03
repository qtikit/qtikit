import React from 'react';

import {useInteractionStateContext} from '../interactions/InteractionState';
import {classNameForComponent} from '../utils/style';

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  indentifier: string;
};

const Checkbox: React.FC<CheckboxProps> = ({indentifier, ...props}) => {
  const {interactionState, setInteractionState} = useInteractionStateContext();

  const handleChange = () => {
    setInteractionState({
      ...interactionState,
      [indentifier]: !(interactionState[indentifier] === true),
    });
  };

  return (
    <span className={classNameForComponent('checkbox')}>
      <input {...props} type="checkbox" checked={interactionState[indentifier] === true} onChange={handleChange} />
    </span>
  );
};

export default Checkbox;
