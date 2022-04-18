import React, {useEffect, useRef, useState} from 'react';
import {mathjax} from '@qtikit/mathjax-full/js/mathjax';
import {MathML} from '@qtikit/mathjax-full/js/input/mathml';
import {SVG} from '@qtikit/mathjax-full/js/output/svg';
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
options.InputJax = new MathML({});
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

function convert(context: MathJaxContext, math: string, node: HTMLElement) {
  const display = true;
  const metrics = context.svg.getMetricsFor(node, display);
  const outerHTML = context.adaptor.outerHTML(
    context.doc.convert(math.trim(), {
      display,
      ...metrics,
    })
  );
  context.doc.updateDocument();
  updateCSS('MATHJAX-SVG-STYLESHEET', context.svg.cssStyles.cssText);
  return outerHTML;
}

export const MathJax = ({mathML}: {mathML: string}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [svg, setSVG] = useState('<svg></svg>');
  const [context] = useMathJax();

  useEffect(() => {
    if (divRef.current && context) {
      setSVG(convert(context, mathML, divRef.current));
    }
  }, [mathML, context]);

  return <div ref={divRef} dangerouslySetInnerHTML={{__html: svg}}></div>;
};
