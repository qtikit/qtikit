import * as React from 'react';

import {useInteractionStateContext} from '../interactions/InteractionState';
import {classNameForComponent} from '../utils/style';

interface ExtendedTextProps {
  indentifier: string;
  placeholder?: string;
}

const validate = (value: string) => {
  return value;
};

const ExtendedText: React.FC<ExtendedTextProps | any> = ({identifier, placeholder}) => {
  const {interactionState, setInteractionState} = useInteractionStateContext();

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = ({target: {value}}) => {
    setInteractionState({[identifier]: validate(value)});
  };

  return (
    <span className={classNameForComponent('extended-text')}>
      <textarea
        placeholder={placeholder}
        onChange={handleChange}
        value={interactionState[identifier] as string}></textarea>
    </span>
  );
};

export default ExtendedText;
