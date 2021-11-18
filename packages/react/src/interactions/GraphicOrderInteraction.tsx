import React from 'react';
import {GraphicOrderInteractionCharacteristics as GraphicOrderInteractionProps} from '@qtikit/model/lib/qti2_2';

const GraphicOrderInteraction: React.FC<GraphicOrderInteractionProps | any> = props => {
  return (
    <div>
      <h3>Graphic Order Interaction</h3>
      {props.children}
    </div>
  );
};

export default GraphicOrderInteraction;
