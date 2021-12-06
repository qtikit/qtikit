import React from 'react';

import {useInteractionStateContext} from '../interactions/InteractionState';
import {classNameForComponent} from '../utils/style';

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  identifier: string;
};

const Checkbox: React.FC<CheckboxProps> = ({identifier, ...props}) => {
  const {interactionState, setInteractionState} = useInteractionStateContext();

  const handleChange = () => {
    setInteractionState({
      ...interactionState,
      [identifier]: !(interactionState[identifier] === true),
    });
  };

  return (
    <span className={classNameForComponent('checkbox')}>
      <input {...props} type="checkbox" checked={interactionState[identifier] === true} onChange={handleChange} />
    </span>
  );
};

export default Checkbox;
