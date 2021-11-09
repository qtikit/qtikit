import React from "react";

import { SimpleChoiceCharacteristics as SimpleChoiceProps } from '@qtikit/model/src/qti2_2';

const SimpleChoice: React.FC<SimpleChoiceProps | any> = props => {
  return (
    <div>
      <h5>Simple Choice</h5>
      {props.children}
    </div>
  );
};

export default SimpleChoice;
