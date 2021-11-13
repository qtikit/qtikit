import React from 'react';
import {TextEntryInteractionCharacteristics as TextEntryInteractionProps} from '@qtikit/model/lib/qti2_2';

const TextEntryInteraction: React.FC<TextEntryInteractionProps | any> = props => {
  return (
    <div>
      <h3>Upload Interaction</h3>
      {props.children}
    </div>
  );
};

export default TextEntryInteraction;
