import React from 'react';
import {HotspotInteractionCharacteristics as HotspotInteractionProps} from '@qtikit/model/lib/qti2_2';

const HotspotInteraction: React.FC<HotspotInteractionProps | any> = props => {
  return (
    <div>
      <h3>Hotspot Interaction</h3>
      {props.children}
    </div>
  );
};

export default HotspotInteraction;
