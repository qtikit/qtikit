import React, {useState, useEffect} from 'react';

import {useFetchData} from '../utils/fetch';
import {classNameForComponent} from '../utils/style';

export interface MathMLProps {
  mathML: string;
  display?: string;
}

const LazyMathComponent: React.FC<MathMLProps> = props => {
  const [mathjaxReact, setMathjaxReact] = useState<typeof import('@qtikit/mathjax-react/lib/MathJax')>();
  useEffect(() => void import('@qtikit/mathjax-react/lib/MathJax').then(setMathjaxReact), []);

  if (!mathjaxReact) {
    return null;
  }

  const {MathJax} = mathjaxReact;
  return props.display === 'block' ? (
    <div>
      <MathJax {...props} />
    </div>
  ) : (
    <MathJax {...props} />
  );
};

const MathML: React.FC<MathMLProps> = ({mathML, display, ...props}) => {
  const [, onFetchEnd] = useFetchData('math', encodeURIComponent(mathML), '');

  useEffect(() => {
    onFetchEnd();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mathML]);

  return (
    <span className={classNameForComponent('mathjax')}>
      <LazyMathComponent {...props} mathML={mathML} />
    </span>
  );
};

export default MathML;
