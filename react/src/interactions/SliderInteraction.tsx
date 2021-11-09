import React from "react";

import { SliderInteractionCharacteristics as SliderInteractionProps } from '@qtikit/model/src/qti2_2';

const SliderInteraction: React.FC<SliderInteractionProps | any> = props => {
  return (
    <div>
      <h3>Slider Interaction</h3>
      {props.children}
    </div>
  );
};

export default SliderInteraction;
