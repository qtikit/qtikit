import * as React from 'react';
import {RubricBlockCharacteristics as RubricBlockProps} from '@qtikit/model/lib/qti2_2';

import {classNameForComponent} from '../utils/style';

const RubricBlock: React.FC<RubricBlockProps | any> = props => (
  <span
    className={[
      classNameForComponent('rubric-block'),
      props.view && classNameForComponent('rubric-block', props.view),
    ].join(' ')}>
    <span>{props.view}:</span>
    {props.children}
  </span>
);

export default RubricBlock;
