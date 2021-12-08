import React from 'react';
import {BaseSequenceXBaseCharacteristics, RubricBlockCharacteristics} from '@qtikit/model/lib/qti2_2';

import {QtiModelProps} from '../types/props';
import {classNameForComponent} from '../utils/style';

export type RubricBlockProps = QtiModelProps<BaseSequenceXBaseCharacteristics, RubricBlockCharacteristics> & {
  view: 'author' | 'candidate' | 'proctor' | 'scorer' | 'testConstructor' | 'tutor';
};

const RubricBlock: React.FC<RubricBlockProps> = ({view, children}) => (
  <span
    className={[classNameForComponent('rubric-block'), view && classNameForComponent('rubric-block', view)].join(' ')}>
    <span>{view}:</span>
    {children}
  </span>
);

export default RubricBlock;
