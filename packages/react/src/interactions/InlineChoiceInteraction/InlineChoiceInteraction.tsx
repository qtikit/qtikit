import React, {useContext} from 'react';
import {InlineChoiceInteractionCharacteristics as InlineChoiceInteractionProps} from '@qtikit/model/lib/qti2_2';
import {UserInput} from '@qtikit/model/lib/user-input';

import {QtiViewerContext} from '../../QtiViewer';

const InlineChoiceInteraction: React.FC<InlineChoiceInteractionProps | any> = ({
  responseIdentifier,
  shuffle,
  required,
  ...props
}) => {
  const {onChange} = useContext(QtiViewerContext);
  const [value, setValue] = React.useState('');

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = event => {
    const choice = event.target.value;
    const userInput: UserInput = {};

    userInput[responseIdentifier] = [choice];
    onChange(userInput);

    setValue(choice);
  };

  return (
    <select value={value} onChange={handleChange}>
      <option value="">Choose...</option>
      {props.children}
    </select>
  );
};

export default InlineChoiceInteraction;
