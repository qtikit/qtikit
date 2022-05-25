import React, {useEffect, useState} from 'react';
import katex, {KatexOptions} from 'katex';

import {Match} from '../types/match';

export interface KaTeXProps {
  target: string;
  matches: Array<Match>;
}

const katexClassName = `qtikit-component qtikit-component_katex`;

const katexOptions: KatexOptions = {
  throwOnError: false,
};

export const KaTeX: React.FC<KaTeXProps> = ({target, matches}) => {
  const [__html, setHtml] = useState('');

  useEffect(() => {
    let html = target;

    for (const match of matches) {
      html = html.replace(match.match, katex.renderToString(match.pattern, katexOptions));
    }

    setHtml(html);
  }, [target, matches]);

  return <span className={katexClassName} dangerouslySetInnerHTML={{__html}}></span>;
};
