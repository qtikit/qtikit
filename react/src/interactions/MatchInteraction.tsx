import React from "react";

import { MatchInteractionCharacteristics as MatchInteractionProps } from '@qtikit/model/src/qti2_2';

const MatchInteraction: React.FC<MatchInteractionProps | any> = props => {
  return (
    <div>
      <h3>Match Interaction</h3>
      {props.children}
    </div>
  );
};

export default MatchInteraction;
