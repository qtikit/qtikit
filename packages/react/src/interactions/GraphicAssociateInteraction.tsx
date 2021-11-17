import * as React from 'react';
import {GraphicAssociateInteractionCharacteristics as GraphicAssociateInteractionProps} from '@qtikit/model/lib/qti2_2';

const GraphicAssociateInteraction: React.FC<GraphicAssociateInteractionProps | any> = props => {
  return (
    <div>
      <h3>Graphic Associate Interaction</h3>
      {props.children}
    </div>
  );
};

export default GraphicAssociateInteraction;
