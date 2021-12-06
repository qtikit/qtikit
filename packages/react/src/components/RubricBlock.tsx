import * as React from 'react';
import {RubricBlockCharacteristics as RubricBlockProps} from '@qtikit/model/lib/qti2_2';

const RubricBlock: React.FC<RubricBlockProps | any> = props => {
  return (
    <span className={`qtikit-component__rublic-block ${props.view && `qtikit-component__rublic-block-${props.view}`}`}>
      <span>{props.view}:</span>
      {props.children}
    </span>
  );
};

export default RubricBlock;
