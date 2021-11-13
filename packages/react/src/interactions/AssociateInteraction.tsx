import React from 'react';
import {AssociateInteractionCharacteristics as AssociateInteractionProps} from '@qtikit/model/lib/qti2_2';

const AssociateInteraction: React.FC<AssociateInteractionProps | any> = props => {
  return (
    <div>
      <h3>Associate Interaction</h3>
      {props.children}
    </div>
  );
};

export default AssociateInteraction;
