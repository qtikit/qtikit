import {MathComponent} from 'mathjax-react';
import React from 'react';

export interface MathjaxProps {
  mathHtml: string;
}

const Mathjax: React.FC<MathjaxProps> = ({mathHtml, ...props}) => {
  return <MathComponent {...props} mathml={mathHtml} display={false} />;
};

export default Mathjax;
