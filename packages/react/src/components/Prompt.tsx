import React from 'react';
import {BaseSequenceCharacteristics, PromptCharacteristics} from '@qtikit/model/lib/qti2_2';

import {CharsToProps} from '../types/props';
import {classNameForComponent} from '../utils/style';

type PromptProps = CharsToProps<BaseSequenceCharacteristics, PromptCharacteristics>;

const Prompt: React.FC<PromptProps> = ({children}) => {
  return (
    <span className={classNameForComponent('prompt')}>
      <h4>{children}</h4>
    </span>
  );
};

export default Prompt;
