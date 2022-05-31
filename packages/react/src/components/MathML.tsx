import React, {useState, useEffect} from 'react';

import {useFetchEvent} from '../utils/events';
import {classNameForComponent} from '../utils/style';

export interface MathMLProps {
  mathML: string;
}

const LazyMathComponent: React.FC<MathMLProps> = props => {
  const [mathjaxReact, setMathjaxReact] = useState<typeof import('@qtikit/mathjax-react/lib/MathJax')>();
  useEffect(() => void import('@qtikit/mathjax-react/lib/MathJax').then(setMathjaxReact), []);

  if (!mathjaxReact) return null;
  const {MathJax} = mathjaxReact;
  return <MathJax {...props} />;
};

const MathML: React.FC<MathMLProps> = ({mathML, ...props}) => {
  const {fetchStart, fetchEnd} = useFetchEvent('math');

  useEffect(() => {
    fetchStart({});
    fetchEnd({});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mathML]);

  return (
    <span className={classNameForComponent('mathjax')}>
      <LazyMathComponent {...props} mathML={mathML} />
    </span>
  );
};

export default MathML;
