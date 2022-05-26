import React, {useState, useEffect} from 'react';

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

  const {LaTex} = mathjaxReact;

  const matches = tex.split(/(\$\$.*\$\$)/g).filter(match => match.trim().length > 0);

  return (
    <span {...props}>
      {matches.map((match, index) =>
        match.startsWith('$$') ? <LaTex key={index} tex={match.replaceAll('$', '')} /> : match
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
