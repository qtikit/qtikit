import React from 'react';
import {InlineChoiceInteractionCharacteristics as InlineChoiceInteractionProps} from '@qtikit/model/src/qti2_2';

const InlineChoiceInteraction: React.FC<InlineChoiceInteractionProps | any> = props => {
  return (
    <div>
      <h3>Info Control</h3>
      {props.children}
    </div>
  );
};

export default InlineChoiceInteraction;
