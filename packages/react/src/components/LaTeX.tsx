import React, {useState, useEffect} from 'react';
import {extractMath} from 'extract-math';

import {classNameForComponent} from '../utils/style';

export interface LaTeXProps {
  tex: string;
}

const LazyMathComponent: React.FC<LaTeXProps> = ({tex, ...props}) => {
  const [mathjaxReact, setMathjaxReact] = useState<typeof import('@qtikit/mathjax-react/lib/LaTeX')>();
  useEffect(() => void import('@qtikit/mathjax-react/lib/LaTeX').then(setMathjaxReact), []);

  if (!mathjaxReact) {
    return null;
  }

  const {LaTeX} = mathjaxReact;
  const matches = extractMath(tex);

  return (
    <span {...props}>
      {matches.map((match, index) =>
        match.type === 'display' ? <LaTeX key={index} tex={match.value} /> : <span>{match.value}</span>
      )}
    </span>
  );
};

export const LaTeX: React.FC<LaTeXProps> = ({tex, ...props}) => {
  return (
    <span className={classNameForComponent('mathjax')}>
      <LazyMathComponent {...props} tex={tex} />
    </span>
  );
};
