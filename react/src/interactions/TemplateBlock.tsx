import React from "react";

import { TemplateBlockCharacteristics as TemplateBlockProps } from '@qtikit/model/src/qti2_2';

const TemplateBlock: React.FC<TemplateBlockProps | any> = props => {
  return (
    <div>
      <h3>Template Block</h3>
      {props.children}
    </div>
  );
};

export default TemplateBlock;
