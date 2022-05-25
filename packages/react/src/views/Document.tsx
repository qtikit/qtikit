import React from 'react';

import {
  createHTMLComponent,
  createInteractionChildComponent,
  isHTMLElement,
  isInteractionChildElement,
  createMathMLComponent,
  createLaTeXComponent,
} from '../components';
import {
  createFlowGroupInteractionComponent,
  createInteractionComponent,
  isFlowGroupInteraction,
  isInteractionElement,
} from '../interactions';
import {isElementNode, isItemBodyElement, isTextNode, isMathMLElement, isModalFeedbackElement} from '../utils/node';
import {fetchText} from '../utils/fetch';
import {getBaseUrl, resolveBaseUrl} from '../utils/url';
import {reduceElement, trimXml} from '../utils/xml';

export type QtiElements = Record<any, Element>;

class QtiComponentKey {
  private static _id = 0;

  static get() {
    return {
      key: `qti-component-${QtiComponentKey._id++}`,
    };
  }
}

export type RenderOption = {
  parseLaTex?: boolean;
};

export function renderQtiBody(node: Node | Element | undefined, options: RenderOption): React.ReactNode {
  if (!node) {
    return;
  }

  const {childNodes} = node;
  const defaultProps = {
    ...QtiComponentKey.get(),
  };

  if (isTextNode(node)) {
    if (options?.parseLaTex && node.nodeValue) {
      return createLaTeXComponent(node.nodeValue, defaultProps);
    }

    return node.nodeValue;
  } else if (isMathMLElement(node)) {
    return createMathMLComponent(node as Element, defaultProps);
  } else if (isElementNode(node)) {
    if (isFlowGroupInteraction(node)) {
      return createFlowGroupInteractionComponent(node, defaultProps);
    } else {
      const children = childNodes ? Array.from(childNodes).map(childNode => renderQtiBody(childNode, options)) : [];

      if (isHTMLElement(node)) {
        return createHTMLComponent(node, defaultProps, children);
      } else if (isInteractionElement(node)) {
        return createInteractionComponent(node, defaultProps, children);
      } else if (isInteractionChildElement(node)) {
        return createInteractionChildComponent(node, defaultProps, children);
      } else if (isItemBodyElement(node) || isModalFeedbackElement(node)) {
        return React.createElement(React.Fragment, defaultProps, children);
      } else {
        console.warn(`Unsupported node type: ${node.nodeName}`);
      }
    }
  }
}

function parseItemBody(root: Document) {
  const [itemBody] = root.documentElement.getElementsByTagName('itemBody');

  if (!itemBody) {
    throw new Error('QTI itemBody is not found');
  }

  return itemBody;
}

function parseResponseDeclaration(root: Document): QtiElements {
  return reduceElement('responseDeclaration', root.documentElement, (correct, response) => {
    const identifier = response.getAttribute('identifier');
    correct[identifier] = reduceElement('value', response, (values, value) => {
      values[value.textContent] = true;
      return values;
    });

    return correct;
  });
}

function parseModalFeedbacks(root: Document): QtiElements {
  return reduceElement('modalFeedback', root.documentElement, (feedbacks, feedback) => {
    const identifier = feedback.getAttribute('identifier');
    feedbacks[identifier] = feedback;

    return feedbacks;
  });
}

function parseStylesheet(root: Document, resolveUrl: any): string[] {
  return Array.from(root.getElementsByTagName('stylesheet')).map(stylesheet =>
    resolveUrl(stylesheet.getAttribute('href'))
  );
}

export class QtiDocument {
  xml?: string;
  styleUrls: string[] = [];
  baseUrl = '';
  itemBody?: Element;
  stylesheets?: string[];
  responseDeclarations: QtiElements = {};
  modalFeedbacks: QtiElements = {};

  constructor() {}

  hasItemBody() {
    return this.itemBody && this.xml;
  }

  hasModalFeedback() {
    return Object.keys(this.modalFeedbacks).length > 0;
  }

  hasRublicBlock(identifier: string) {
    return identifier;
  }

  static async create(url: string, defaultStyleUrl?: string, resolveUrl?: any) {
    const doc = new QtiDocument();
    const data = await QtiDocument.fetch(url, resolveUrl);
    const root = new DOMParser().parseFromString(trimXml(data), 'text/xml');

    doc.xml = url;
    doc.baseUrl = getBaseUrl(doc.xml);
    doc.styleUrls = parseStylesheet(root, (href: any) => resolveBaseUrl(href || '', doc.baseUrl));

    if (defaultStyleUrl) {
      doc.styleUrls.unshift(defaultStyleUrl);
    }

    doc.itemBody = parseItemBody(root);
    doc.stylesheets = await Promise.all(doc.styleUrls.map(url => QtiDocument.fetch(url, resolveUrl)));
    doc.modalFeedbacks = parseModalFeedbacks(root);
    doc.responseDeclarations = parseResponseDeclaration(root);

    return doc;
  }

  static async fetch(url: string, resolveUrl?: any) {
    return fetchText(resolveUrl ? resolveUrl(url) : url);
  }
}

export const QtiBody: React.FC<{name: string; root?: Element; options: RenderOption}> = React.memo(
  ({name, root, options}) => <div className={name}>{renderQtiBody(root, options)}</div>
);
