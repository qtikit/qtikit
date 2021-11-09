import React from "react";

import { PromptCharacteristics as PromptProps } from '@qtikit/model/src/qti2_2';

const Prompt: React.FC<PromptProps | any> = props => {
  return (
    <div>
      <h4>Prompt</h4>
      {props.children}
    </div>
  );
};

export default Prompt;
