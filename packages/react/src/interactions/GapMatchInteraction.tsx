import React from 'react';
import {GapMatchInteractionCharacteristics as GapMatchInteractionProps} from '@qtikit/model/lib/qti2_2';

const GapMatchInteraction: React.FC<GapMatchInteractionProps | any> = props => {
  return (
    <div>
      <h3>GapMatch Interaction</h3>
      {props.children}
    </div>
  );
};

export default GapMatchInteraction;
