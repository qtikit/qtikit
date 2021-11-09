import React from "react";

import { InfoControlCharacteristics as InfoControlProps } from '@qtikit/model/src/qti2_2';

const InfoControl: React.FC<InfoControlProps | any> = props => {
  return (
    <div>
      <h3>Info Control</h3>
      {props.children}
    </div>
  );
};

export default InfoControl;
