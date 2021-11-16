import React, {useContext} from 'react';
import {TextEntryInteractionCharacteristics as TextEntryInteractionProps} from '@qtikit/model/lib/qti2_2';
import {UserInput} from '@qtikit/model/lib/user-input';

import {getPlaceHolder} from '../../utils/interaction';
import {QtiViewerContext} from '../../QtiViewer';

const textStyle = {
  fontSize: '1em',
  border: 'solid 1px',
  width: '6ex',
};

const TextEntryInteraction: React.FC<TextEntryInteractionProps | any> = ({responseIdentifier, ...props}) => {
  const {onChange} = useContext(QtiViewerContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInput: UserInput = {};
    userInput[responseIdentifier] = [event.target.value];
    onChange(userInput);
  };

  return (
    <span>
      <input type="text" style={textStyle} placeholder={getPlaceHolder(props)} onChange={handleChange} />
      {props.children}
    </span>
  );
};

export default TextEntryInteraction;
