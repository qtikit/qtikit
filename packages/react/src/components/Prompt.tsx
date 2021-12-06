import React from 'react';
import {PromptCharacteristics as PromptProps} from '@qtikit/model/lib/qti2_2';

import {classNameForComponent} from '../utils/style';

const Prompt: React.FC<PromptProps | any> = props => {
  return (
    <span className={classNameForComponent('prompt')}>
      <h4>{props.children}</h4>
    </span>
  );
};

export default Prompt;
