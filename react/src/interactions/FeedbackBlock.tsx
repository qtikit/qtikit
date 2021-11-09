import React from "react";

import { FeedbackBlockCharacteristics as FeedbackBlockProps } from '@qtikit/model/src/qti2_2';

const FeedbackBlock: React.FC<FeedbackBlockProps | any> = props => {
  return (
    <div>
      <h3>Feedback Block</h3>
      {props.children}
    </div>
  );
};

export default FeedbackBlock;
