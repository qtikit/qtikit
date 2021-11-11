import React from 'react';
import {DrawingInteractionCharacteristics as DrawingInteractionProps} from '@qtikit/model/src/qti2_2';

const DrawingInteraction: React.FC<DrawingInteractionProps | any> = props => {
  return (
    <div>
      <h3>Drawing Interaction</h3>
      {props.children}
    </div>
  );
};

export default DrawingInteraction;
