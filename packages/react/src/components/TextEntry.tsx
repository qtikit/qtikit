import * as React from 'react';

import {useInteractionStateContext} from '../interactions/InteractionState';
import {classNameForComponent} from '../utils/style';

export interface TextEntryProps {
  identifier: string;
  placeholder?: string;
}

const TextEntry: React.FC<TextEntryProps> = ({identifier, placeholder}) => {
  const {interactionState, setInteractionState} = useInteractionStateContext();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({target: {value}}) => {
    setInteractionState({[identifier]: value});
  };

  return (
    <span className={classNameForComponent('text-entry')}>
      <input
        type="text"
        placeholder={placeholder}
        value={interactionState[identifier] as string}
        onChange={handleChange}
      />
    </span>
  );
};

export default TextEntry;
