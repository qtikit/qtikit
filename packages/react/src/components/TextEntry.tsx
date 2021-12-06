import * as React from 'react';

import {useInteractionStateContext} from '../interactions/InteractionState';

interface TextEntryProps {
  indentifier: string;
  placeholder?: string;
}

const TextEntry: React.FC<TextEntryProps | any> = ({identifier, placeholder}) => {
  const {interactionState, setInteractionState} = useInteractionStateContext();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({target: {value}}) => {
    setInteractionState({[identifier]: value});
  };

  return (
    <span className={'qtikit-component__text-entry'}>
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
