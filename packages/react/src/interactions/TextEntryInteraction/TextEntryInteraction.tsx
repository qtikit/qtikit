import React from 'react';
import {TextEntryInteractionCharacteristics as TextEntryInteractionProps} from '@qtikit/model/lib/qti2_2';

import {getPlaceHolder} from '../../utils/interaction';

const textStyle = {
  fontSize: '1em',
  border: 'solid 1px',
  width: '6ex',
};

const TextEntryInteraction: React.FC<TextEntryInteractionProps | any> = props => {
  return (
    <span>
      <input type="text" style={textStyle} placeholder={getPlaceHolder(props)} />
      {props.children}
    </span>
  );
};

export default TextEntryInteraction;
