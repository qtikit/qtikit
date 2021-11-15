import React from 'react';
import {InlineChoiceInteractionCharacteristics as InlineChoiceInteractionProps} from '@qtikit/model/lib/qti2_2';

const InlineChoiceInteraction: React.FC<InlineChoiceInteractionProps | any> = ({shuffle, required, ...props}) => {
  const [value, setValue] = React.useState('');
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = event => {
    console.log('resonse', event.target.value);
    setValue(event.target.value);
  };

  return (
    <select value={value} onChange={handleChange}>
      <option value="">Choose...</option>
      {props.children}
    </select>
  );
};

export default InlineChoiceInteraction;
