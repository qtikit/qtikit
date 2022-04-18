import React from 'react';
import {MathJax} from '@qtikit/mathjax-react/lib/MathJax';

import {classNameForComponent} from '../utils/style';

export interface MathMLProps {
  mathML: string;
}

const MathML: React.FC<MathMLProps> = ({mathML, ...props}) => {
  return (
    <span className={classNameForComponent('mathjax')}>
      <MathJax {...props} mathML={mathML} />
    </span>
  );
};

export default MathML;
