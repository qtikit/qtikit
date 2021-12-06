import type {MathComponentProps} from 'mathjax-react/dist/components/MathComponent';
import React, {useState, useEffect} from 'react';

export interface MathjaxProps {
  mathHtml: string;
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
    <span className={'qtikit-component__mathjax'}>
      <LazyMathComponent {...props} mathml={mathHtml} display={false} />
    </span>
  );
};

export default Mathjax;
