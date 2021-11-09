import React from "react";

import { UploadInteractionCharacteristics as UploadInteractionProps } from '@qtikit/model/src/qti2_2';

const UploadInteraction: React.FC<UploadInteractionProps | any> = props => {
  return (
    <div>
      <h3>Upload Interaction</h3>
      {props.children}
    </div>
  );
};

export default UploadInteraction;
