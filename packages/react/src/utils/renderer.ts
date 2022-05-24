import React from 'react';

import {
  createHTMLComponent,
  createInteractionChildComponent,
  isHTMLElement,
  isInteractionChildElement,
  createMathMLComponent,
} from '../components';
import {
  createFlowGroupInteractionComponent,
  createInteractionComponent,
  isFlowGroupInteraction,
  isInteractionElement,
} from '../interactions';
import {Props} from '../types/component';
import {isElementNode, isRootElement, isTextNode, isMathMLElement, isModalFeedback} from '../utils/node';
import {Source, UrlData, ViewOptions, ViewSource, XmlSource} from '../views/View';
import {getBaseUrl, resolveUrl} from './url';
import {trimXml} from './xml';

async function fetchText(src: string): Promise<string> {
  return await fetch(src).then(response => response.text());
}

function getItemBodyElement(root: Document) {
  const [itemBody] = root.documentElement.getElementsByTagName('itemBody');

  if (!itemBody) {
    throw new Error('QTI itemBody is not found');
  }

  return itemBody;
}

async function getStyles(root: Document, baseUrl: string, styleUrl?: string) {
  const stylesElements = Array.from(root.getElementsByTagName('stylesheet'));
  const stylesSrc = stylesElements.map(stylesheet => resolveUrl(stylesheet.getAttribute('href') || '', baseUrl));
  if (styleUrl) {
    stylesSrc.unshift(styleUrl);
  }

  return await Promise.all(stylesSrc.map(fetchText));
}

async function getXmlDocument(xmlSrc: XmlSource) {
  const xml = xmlSrc.document ?? (await fetchText(xmlSrc.url));
  return new DOMParser().parseFromString(trimXml(xml), 'text/xml');
}
// export async function parseAssessmentItem(source: ViewSource, options?: ViewOptions): Promise<AssessmentItem> {
export async function parseDocument(xmlSrc: XmlSource, styleSrc?: string, options?: ViewOptions) {
  const root = await getXmlDocument(xmlSrc);
  const baseUrl = getBaseUrl(xmlSrc.url);

  // const renderOptions: Qti.ItemBodyRenderOptions = {
  //   index: 0,
  //   predicate: (node: Node, defaultProps: Props) => {
  //     if (!options?.formulaInput) {
  //       return null;
  //     }

  //     if (options?.formulaInput.type === 'latex' && isTextNode(node)) {
  //       const text = node.nodeValue || '';
  //       const matches = options.formulaInput.match(text);
  //       return createKaTeXComponent({text, matches}, defaultProps);
  //     }

  //     return null;
  //   },
  // };

  return {
    // assessmentSrc: assessmentSrc,
    itemBody: getItemBodyElement(root),
    // modalFeedbacks: options?.modalFeedbacks ? getModalFeedbacks(root) : [],
    styles: await getStyles(root, baseUrl, styleSrc),
    // correctResponses: options?.showCorrectResponse ? readCorrectResponse(root) : null,
    // renderOptions,
  };
}

export type RenderOptions = {
  index: number;
  predicate: (node: Node, defaultProps: Props) => React.ReactNode;
};

export function renderItemBody(node: Node | Element, options: RenderOptions): React.ReactNode {
  const {childNodes} = node;

  const defaultProps = {
    key: `qti-component-${options.index}`,
  };

  const comp = options.predicate(node, defaultProps);
  if (comp) {
    return comp;
  }

  if (isTextNode(node)) {
    return node.nodeValue;
  } else if (isMathMLElement(node)) {
    return createMathMLComponent(node as Element, defaultProps);
  } else if (isElementNode(node)) {
    if (isFlowGroupInteraction(node)) {
      return createFlowGroupInteractionComponent(node, defaultProps);
    } else {
      const children = childNodes
        ? Array.from(childNodes).map(childNode => {
            options.index++;
            return renderItemBody(childNode, options);
          })
        : [];

      if (isHTMLElement(node)) {
        return createHTMLComponent(node, defaultProps, children);
      } else if (isInteractionElement(node)) {
        return createInteractionComponent(node, defaultProps, children);
      } else if (isInteractionChildElement(node)) {
        return createInteractionChildComponent(node, defaultProps, children);
      } else if (isRootElement(node)) {
        return React.createElement(React.Fragment, defaultProps, children);
      } else {
        console.warn(`Unsupported node type: ${node.nodeName}`);
      }
    }
  }
}

export function renderModalFeedback(node: Node | Element, options: RenderOptions): React.ReactNode {
  const {childNodes} = node;

  const comp = options.predicate(node, {});
  if (comp) {
    return comp;
  }

  if (isTextNode(node)) {
    return node.nodeValue;
  } else if (isMathMLElement(node)) {
    return createMathMLComponent(node as Element, {});
  } else if (isElementNode(node)) {
    const children = childNodes
      ? Array.from(childNodes).map(childNode => {
          return renderModalFeedback(childNode, options);
        })
      : [];
    if (isHTMLElement(node)) {
      return createHTMLComponent(node, {}, children);
    } else if (isModalFeedback(node)) {
      return React.createElement(React.Fragment, {}, children);
    } else {
      console.warn(`Unsupported node type: ${node.nodeName}`);
    }
  }
}
