import React, {useEffect, useRef} from 'react';
import katex from 'katex';

import {classNameForComponent} from '../utils/style';

export interface MathMLProps {
  html: string;
}

const MathML: React.FC<MathMLProps> = ({ html, ...props}) => {
  const renderRef = useRef(null);
  useEffect(() => {
    if (renderRef.current) {
      katex.render("c = \\pm\\sqrt{a^2 + b^2}", renderRef.current, {
        throwOnError: false
      });
    }
  })
  return (
    <span className={classNameForComponent('mathML')}>
      <span ref={renderRef}/>
    </span>
  );
};

export default MathML;
