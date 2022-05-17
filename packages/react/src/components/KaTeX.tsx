import React, {useEffect, useState} from 'react';
import katex, {KatexOptions} from 'katex';

export interface KaTeXMatch {
  pattern: string;
  latex: string;
}

export type KaTeXMatchArray = Array<KaTeXMatch>;

export interface KaTeXProps {
  text: string;
  matches: KaTeXMatchArray;
}

const katexClassName = `qtikit-component qtikit-component_katex`;

const katexOptions: KatexOptions = {
  throwOnError: false,
};

export const KaTeX: React.FC<KaTeXProps> = ({text, matches}) => {
  const [__html, setHtml] = useState('');

  useEffect(() => {
    let html = text;

    if (Array.isArray(matches)) {
      for (const match of matches) {
        html = html.replace(match.pattern, katex.renderToString(match.latex, katexOptions));
      }
    } else if (typeof matches === 'string') {
      html = html.replace(matches, katex.renderToString(matches, katexOptions));
    } else {
      throw new Error(`Invalid match result, ${JSON.stringify(matches)}`);
    }

    setHtml(html);
  }, [text, matches]);

  return <span className={katexClassName} dangerouslySetInnerHTML={{__html}}></span>;
};
