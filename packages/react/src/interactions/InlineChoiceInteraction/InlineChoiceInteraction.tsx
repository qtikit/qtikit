import React from 'react';
import {InlineChoiceInteractionCharacteristics as InlineChoiceInteractionProps} from '@qtikit/model/src/qti2_2';

const InlineChoiceInteraction: React.FC<InlineChoiceInteractionProps | any> = ({shuffle, required, ...props}) => {
  const [value, setValue] = React.useState('$choose');
  const handleChange = (event: {target: {value: any}}) => {
    console.log('resonse', event.target.value);
    setValue(event.target.value);
  };

  return (
    <select value={value} onChange={handleChange}>
      <option value="$choose">Choose...</option>
      {props.children}
    </select>
  );
};

export default InlineChoiceInteraction;
