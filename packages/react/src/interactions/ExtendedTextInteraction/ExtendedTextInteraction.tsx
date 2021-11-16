import React from 'react';
import {ExtendedTextInteractionCharacteristics as ExtendedTextInteractionProps} from '@qtikit/model/lib/qti2_2';

import {InteractionResponse} from '../InteractionResponseContext';
import {getPlaceHolder} from '../../utils/interaction';

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

const ExtendedTextInteraction: React.FC<ExtendedTextInteractionProps | any> = ({
  stringIdentifier,
  responseIdentifier,
  ...props
}) => {
  const [, setResponse] = React.useState<InteractionResponse>({});

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponse({
      identifier: responseIdentifier,
      value: validate(event.target.value),
    });
  };

  return (
    <div>
      {props.children}
      <div style={textareaBlockStyle}>
        <textarea
          placeholder={getPlaceHolder(props)}
          name={stringIdentifier || responseIdentifier}
          style={textareaStyle}
          onChange={handleChange}></textarea>
      </div>
    </div>
  );
};

export default ExtendedTextInteraction;
