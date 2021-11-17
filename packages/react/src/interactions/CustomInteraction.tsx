import * as React from 'react';
import {CustomInteractionCharacteristics as CustomInteractionProps} from '@qtikit/model/lib/qti2_2';

const CustomInteraction: React.FC<CustomInteractionProps | any> = props => {
  return (
    <div>
      <h3>Custom Interaction</h3>
      {props.children}
    </div>
  );
};

export default CustomInteraction;
