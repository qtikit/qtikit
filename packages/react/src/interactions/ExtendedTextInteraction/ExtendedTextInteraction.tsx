import React, {useContext} from 'react';
import {ExtendedTextInteractionCharacteristics as ExtendedTextInteractionProps} from '@qtikit/model/lib/qti2_2';
import {UserInput} from '@qtikit/model/lib/user-input';

import {getPlaceHolder} from '../../utils/interaction';
import {QtiViewerContext} from '../../QtiViewer';

const validate = (value: string) => {
  return value;
};

const textareaBlockStyle = {
  display: 'flex',
};

const textareaStyle = {
  width: '90%',
  marginTop: '1em',
  height: '14em',
};

const ExtendedTextInteraction: React.FC<ExtendedTextInteractionProps | any> = ({responseIdentifier, ...props}) => {
  const {onChange} = useContext(QtiViewerContext);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const userInput: UserInput = {};
    userInput[responseIdentifier] = [validate(event.target.value)];
    onChange(userInput);
  };

  return (
    <div>
      {props.children}
      <div style={textareaBlockStyle}>
        <textarea placeholder={getPlaceHolder(props)} style={textareaStyle} onChange={handleChange}></textarea>
      </div>
    </div>
  );
};

export default ExtendedTextInteraction;
