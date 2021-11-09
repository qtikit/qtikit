import React from "react";

import { ChoiceInteractionCharacteristics as ChoiceInteractionProps } from '@qtikit/model/src/qti2_2';

const ChoiceInteraction: React.FC<ChoiceInteractionProps | any> = props => {
  return (
    <div>
      <h3>Choice Interaction</h3>
      {props.children}
    </div>
  );
};

export default ChoiceInteraction;
