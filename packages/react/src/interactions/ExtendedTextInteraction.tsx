import React from 'react';
import {ExtendedTextInteractionCharacteristics as ExtendedTextInteractionProps} from '@qtikit/model/src/qti2_2';

const ExtendedTextInteraction: React.FC<ExtendedTextInteractionProps | any> = props => {
  return (
    <div>
      <h3>Extended Text Interaction</h3>
      {props.children}
    </div>
  );
};

export default ExtendedTextInteraction;
