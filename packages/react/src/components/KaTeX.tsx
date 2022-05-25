import React, {useEffect, useState} from 'react';
import katex, {KatexOptions} from 'katex';

export interface KaTeXProps {
  text: string;
}

const regexOnyxLaTex = (text: string) => [...text.matchAll(/\$\$(.*)\$\$/g)];

const katexClassName = `qtikit-component qtikit-component_katex`;

const katexOptions: KatexOptions = {
  throwOnError: false,
};

export const KaTeX: React.FC<KaTeXProps> = ({text}) => {
  const [__html, setHtml] = useState('');

  useEffect(() => {
    const matches = regexOnyxLaTex(text).map(match => ({
      match: match[0],
      pattern: match[1].replace(/\$/g, ''),
    }));

    let html = text;

    for (const match of matches) {
      html = html.replace(match.match, katex.renderToString(match.pattern, katexOptions));
    }

    setHtml(html);
  }, [text]);

  return <span className={katexClassName} dangerouslySetInnerHTML={{__html}}></span>;
};
