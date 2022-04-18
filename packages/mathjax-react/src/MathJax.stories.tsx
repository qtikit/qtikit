import React, {useEffect} from 'react';

import {MathML} from './MathML';

type SetMathMLDelegate = React.Dispatch<React.SetStateAction<string>>;
async function fetchXML(xml: string, delegate?: SetMathMLDelegate) {
  const response = await fetch(xml);
  const data = await response.text();

  delegate && delegate(data);
  return data;
}

const MathMLTemplate = ({xmlSrc}: {xmlSrc: string}) => {
  const [mathML, setMathML] = React.useState('');

  useEffect(() => {
    fetchXML(xmlSrc, setMathML);
  }, [xmlSrc]);

  return <>{mathML && <MathML mathML={mathML} />}</>;
};

export const MSpace = MathMLTemplate.bind({});

MSpace.storyName = 'mspace-linebreak';
MSpace.args = {
  xmlSrc: 'tests/mspace-linebreak.xml',
};

export const Mo = MathMLTemplate.bind({});

Mo.storyName = 'mo-parentheses';
Mo.args = {
  xmlSrc: 'tests/mo-parentheses.xml',
};

export const Mtext = MathMLTemplate.bind({});

Mtext.storyName = 'mtext';
Mtext.args = {
  xmlSrc: 'tests/mtext.xml',
};

export const Mrow = MathMLTemplate.bind({});

Mrow.storyName = 'mrow';
Mrow.args = {
  xmlSrc: 'tests/mrow-no-parenttheses.xml',
};

export const MoEnv = MathMLTemplate.bind({});

MoEnv.storyName = 'mo-environment';
MoEnv.args = {
  xmlSrc: 'tests/mo-environment.xml',
};

export default {
  title: 'MathML',
};
