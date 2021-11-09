import React from "react";

import { SelectPointInteractionCharacteristics as SelectPointInteractionProps } from '@qtikit/model/src/qti2_2';

const SelectPointInteraction: React.FC<SelectPointInteractionProps | any> = props => {
  return (
    <div>
      <h3>Select Point Interaction</h3>
      {props.children}
    </div>
  );
};

export default SelectPointInteraction;
