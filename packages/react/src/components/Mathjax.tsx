import type {MathComponentProps} from 'mathjax-react/dist/components/MathComponent';
import React, {useState, useEffect} from 'react';

import {classNameForComponent} from '../utils/style';

export interface MathjaxProps {
  mathHtml: string;
}

function normalizeMathHtml(mathHtml: string): string {
  return mathHtml;
  // return mathHtml.replace(/<m:mspace linebreak="newline">/g, '<br/>');
}

// TODO: replace to `React.lazy` after apply React 18
const LazyMathComponent: React.FC<MathComponentProps> = props => {
  const [mathjaxReact, setMathjaxReact] = useState<typeof import('mathjax-react')>();
  useEffect(() => void import('mathjax-react').then(setMathjaxReact), []);
  if (!mathjaxReact) return null;
  const {MathComponent} = mathjaxReact;
  return <MathComponent {...props} />;
};

const Mathjax: React.FC<MathjaxProps> = ({mathHtml, ...props}) => {
  return (
    <span className={classNameForComponent('mathjax')}>
      <LazyMathComponent
        {...props}
        mathml={normalizeMathHtml(mathHtml)}
        display={false}
        settings={{
          // 'HTML-CSS': {
          //   linebreaks: {automatic: true, width: 'container'},
          // },
          linebreaks: {automatic: true, width: 'container'},
        }}
      />
    </span>
  );
};

export default Mathjax;
