import React, {useEffect, useRef, useState} from 'react';
import {mathjax} from '@qtikit/mathjax-full/js/mathjax';
import {MathML} from '@qtikit/mathjax-full/js/input/mathml';
import {SVG} from '@qtikit/mathjax-full/js/output/svg';
import {browserAdaptor} from '@qtikit/mathjax-full/js/adaptors/browserAdaptor';
import {RegisterHTMLHandler} from '@qtikit/mathjax-full/js/handlers/html';
import {STATE} from '@qtikit/mathjax-full/js/core/MathItem';

const adaptor = browserAdaptor();
RegisterHTMLHandler(adaptor);

function onError(math: any) {
  const {root, typesetRoot} = math;
  if (root.toString().substr(0, 14) === 'math([merror([') {
    const merror = root.childNodes[0].childNodes[0];
    const text = merror.attributes.get('data-mjx-error') || merror.childNodes[0].childNodes[0].getText();
    adaptor.setAttribute(typesetRoot, 'data-mjx-error', text);
  }
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
const markErrors = [STATE.TYPESET + 1, null, onError];

const mathML = new MathML({});
const svg = new SVG({fontCache: 'none'});
const doc = mathjax.document('', {
  InputJax: mathML,
  OutputJax: svg,
  renderActions: {
    markErrors,
  },
});

function convert(math: string, node: HTMLElement) {
  const display = true;
  const metrics = svg.getMetricsFor(node, display);
  const outerHTML = adaptor.outerHTML(
    doc.convert(math.trim(), {
      display,
      ...metrics,
    })
  );
  doc.updateDocument();
  updateCSS('MATHJAX-SVG-STYLESHEET', svg.cssStyles.cssText);
  return outerHTML;
}

export const MathJax3 = ({mathML}: {mathML: string}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [svg, setSVG] = useState('<svg></svg>');

  useEffect(() => {
    if (divRef.current) {
      setSVG(convert(mathML, divRef.current));
    }
  }, [mathML]);

  return <div ref={divRef} dangerouslySetInnerHTML={{__html: svg}}></div>;
};
