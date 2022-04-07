import React, {useEffect, useRef} from 'react';
import katex from 'katex';
import mmToLatex from '@qtikit/mathml-to-latex'

import {classNameForComponent} from '../utils/style';

export interface MathMLProps {
  html: string;
}

function convertoMMToLatex(html: string) {
  return mmToLatex.convert(html.replace(/m:/gi, ''))
}

const MathML: React.FC<MathMLProps> = ({ html, ...props}) => {
  const renderRef = useRef(null);
  useEffect(() => {
    if (renderRef.current) {
      katex.render(convertoMMToLatex(html), renderRef.current, {
        throwOnError: false,
        output: 'htmlAndMathml'
      });
    }
  }, [renderRef.current])

  return (
    <span className={classNameForComponent('math-ml')}>
      <span ref={renderRef}/>
    </span>
  );
};

export default MathML;
