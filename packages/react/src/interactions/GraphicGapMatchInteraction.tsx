import React from 'react';
import {GraphicGapMatchInteractionCharacteristics as GraphicGapMatchInteractionProps} from '@qtikit/model/lib/qti2_2';

const GraphicGapMatchInteraction: React.FC<GraphicGapMatchInteractionProps | any> = props => {
  return (
    <div>
      <h3>Graphic Gap Match Interaction</h3>
      {props.children}
    </div>
  );
};

export default GraphicGapMatchInteraction;
