import React from 'react';
import {HotTextInteractionCharacteristics as HottextInteractionProps} from '@qtikit/model/src/qti2_2';

const HottextInteraction: React.FC<HottextInteractionProps | any> = props => {
  return (
    <div>
      <h3>Hottext Interaction</h3>
      {props.children}
    </div>
  );
};

export default HottextInteraction;
