import React, {useEffect} from 'react';

import {MathJax} from './MathJax';

type SetMathMLDelegate = React.Dispatch<React.SetStateAction<string>>;
async function fetchXML(xml: string, delegate?: SetMathMLDelegate) {
  const response = await fetch(xml);
  const data = await response.text();

  delegate && delegate(data);
  return data;
}

const MathJaxTemplate = ({xmlSrc}: {xmlSrc: string}) => {
  const [mathML, setMathML] = React.useState('');

  useEffect(() => {
    fetchXML(xmlSrc, setMathML);
  }, [xmlSrc]);

  return <>{mathML && <MathJax mathML={mathML} />}</>;
};

export const MSpace = MathJaxTemplate.bind({});

MSpace.storyName = 'mspace-linebreak';
MSpace.args = {
  xmlSrc: 'tests/mspace-linebreak.xml',
};

export const Mo = MathJaxTemplate.bind({});

Mo.storyName = 'mo-parentheses';
Mo.args = {
  xmlSrc: 'tests/mo-parentheses.xml',
};

export const Mtext = MathJaxTemplate.bind({});

Mtext.storyName = 'mtext';
Mtext.args = {
  xmlSrc: 'tests/mtext.xml',
};

export const Mrow = MathJaxTemplate.bind({});

Mrow.storyName = 'mrow';
Mrow.args = {
  xmlSrc: 'tests/mrow-no-parenttheses.xml',
};

export const MoEnv = MathJaxTemplate.bind({});

MoEnv.storyName = 'mo-environment';
MoEnv.args = {
  xmlSrc: 'tests/mo-environment.xml',
};

export default {
  title: 'MathJax',
};
