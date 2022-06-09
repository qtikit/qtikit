import React, {useEffect} from 'react';

import {LaTeX} from './LaTeX';

type SetExprDelegate = React.Dispatch<React.SetStateAction<string>>;

async function fetchText(xml: string, delegate?: SetExprDelegate) {
  const response = await fetch(xml);
  const data = await response.text();

  delegate && delegate(data);
  return data;
}

const LaTeXTemplate = ({xmlSrc}: {xmlSrc: string}) => {
  const [expr, setExpr] = React.useState('');

  useEffect(() => {
    fetchText(xmlSrc, setExpr);
  }, [xmlSrc]);

  return <>{expr && <LaTeX tex={expr} />}</>;
};

export const specialCharater = LaTeXTemplate.bind({});

specialCharater.storyName = 'special-charater';
specialCharater.args = {
  xmlSrc: 'tests/special-character.latex',
};

export default {
  title: 'LaTeX',
};

