import React from 'react';
import {BaseSequenceXBaseCharacteristics, RubricBlockCharacteristics} from '@qtikit/model/lib/qti2_2';

import {QtiModelProps} from '../types/props';
import {classNameForComponent} from '../utils/style';

type View = 'author' | 'candidate' | 'proctor' | 'scorer' | 'testConstructor' | 'tutor';

export type RubricBlockProps = QtiModelProps<BaseSequenceXBaseCharacteristics, RubricBlockCharacteristics> & {
  view: string;
};

const RubricBlock: React.FC<RubricBlockProps> = ({view: viewProp, children}) => {
  const views = viewProp.split(' ') as View[];

  return (
    <span
      className={[
        classNameForComponent('rubric-block'),
        ...views.map(view => classNameForComponent('rubric-block', view)),
      ].join(' ')}>
      <span>{views}:</span>
      {children}
    </span>
  );
};

export default RubricBlock;
