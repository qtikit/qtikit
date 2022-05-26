import React, {useEffect, useRef, useState} from 'react';
import {mathjax} from '@qtikit/mathjax-full/js/mathjax';
import {TeX} from '@qtikit/mathjax-full/js/input/tex';
import {SVG} from '@qtikit/mathjax-full/js/output/svg';
import {TeXFont} from '@qtikit/mathjax-full/js/output/chtml/fonts/tex';
import {AllPackages} from '@qtikit/mathjax-full/js/input/tex/AllPackages';
import {browserAdaptor} from '@qtikit/mathjax-full/js/adaptors/browserAdaptor';
import {RegisterHTMLHandler} from '@qtikit/mathjax-full/js/handlers/html';
import {STATE} from '@qtikit/mathjax-full/js/core/MathItem';
import {OptionList} from '@qtikit/mathjax-full/js/util/Options';

interface MathJaxContext {
  adaptor: any;
  doc: any;
  svg?: any;
}

declare global {
  interface Window {
    MathJaxContext: MathJaxContext;
  }
}

const options: OptionList = {};
options.InputJax = new TeX({
  packages: AllPackages,
  inlineMath: [
    ['$$', '$$'],
    ['\\(', '\\)'],
  ],
  displayMath: [
    ['$$', '$$'],
    ['\\[', '\\]'],
  ],
  processEscapes: true,
  processEnvironments: true,
});

options.OutputJax = new SVG({fontCache: 'none'});

options.renderActions = {
  markErrors: [STATE.TYPESET + 1, null, onError],
};

function onError(math: any) {
  const {root} = math;

  if (root.toString().includes('[merror')) {
    const merror = root.childNodes[0].childNodes[0];
    const error = merror.attributes.get('data-mjx-error') || merror.childNodes[0].childNodes[0].getText();
    console.error(`Error Mathjax converting ${error}`);
  }
}

function useMathJax() {
  const [context, setContext] = useState<MathJaxContext | null>(null);

  if (window !== undefined && !context) {
    const adaptor = browserAdaptor();
    RegisterHTMLHandler(adaptor);

    const newContext: MathJaxContext = {
      adaptor,
      doc: mathjax.document('', options),
      svg: options.OutputJax,
    };

    setContext(newContext);
  }

  return [context];
}

function updateCSS(nodeID: any, text: any) {
  let styleNode = document.getElementById(nodeID);
  if (styleNode === null) {
    styleNode = document.createElement('style');
    styleNode.setAttribute('id', nodeID);
    document.head.appendChild(styleNode);
  }
  styleNode.innerHTML = text;
}

function convert(context: MathJaxContext, tex: string, node: HTMLElement) {
  const display = false;
  const metrics = context.svg.getMetricsFor(node, display);
  const outerHTML = context.adaptor.outerHTML(
    context.doc.convert(tex.trim(), {
      display,
      ...metrics,
    })
  );
  context.doc.updateDocument();
  updateCSS('MATHJAX-SVG-STYLESHEET', context.svg.cssStyles.cssText);
  return outerHTML;
}

export const LaTex = ({tex}: {tex: string}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [element, setElement] = useState('<svg></svg>');
  const [context] = useMathJax();

  useEffect(() => {
    if (divRef.current && context) {
      setElement(convert(context, tex, divRef.current));
    }
  }, [tex, context]);

  return <span ref={divRef} dangerouslySetInnerHTML={{__html: element}}></span>;
};
