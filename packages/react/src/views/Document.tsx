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
import {isElementNode, isTextNode, isMathMLElement, isRootElement} from '../utils/node';
import {fetchText} from '../utils/fetch';
import {getBaseUrl, resolveBaseUrl} from '../utils/url';
import {reduceElement, trimXml} from '../utils/xml';
import {QtiViewerEvents, QtiViewerEventType} from '../types/viewer';

export type QtiElements = Record<any, Element>;

export type QtiInteraction = {
  name: string;
  responseIdentifier: string;
  element: Element;
};

export type QtiInteractions = Array<QtiInteraction>;

export type QtiResponses = Record<string, any>;

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

export function renderQtiBody(node: Node | Element | undefined, options?: RenderOption): React.ReactNode {
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
      } else if (isRootElement(node)) {
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

function parseStylesheet(root: Document, onFetchStart: any): string[] {
  return Array.from(root.getElementsByTagName('stylesheet')).map(stylesheet =>
    onFetchStart(stylesheet.getAttribute('href'))
  );
}

function parseRubricBlock(root: Document) {
  return reduceElement('rubricBlock', root.documentElement, (rubrics, rubric) => {
    const id = rubric.getAttribute('id');
    rubrics[id] = rubric;

    return rubrics;
  });
}

function removeRubricBlock(root: Document) {
  for (const rubricBlock of root.getElementsByTagName('rubricBlock')) {
    rubricBlock?.parentNode?.removeChild(rubricBlock);
  }
}

function parseCorrectResponses(root: Document, interactions: QtiInteractions, responseDeclarations: QtiResponses) {
  const corrects: QtiResponses = {};
  const choiceInteractions = Object.entries(interactions).filter(([, {name}]) => name === 'choiceInteraction');
  for (const choice of choiceInteractions) {
    const {element, responseIdentifier} = choice[1];
    const simpleItems = [...element.querySelectorAll('simpleChoice')];
    const correct = simpleItems.reduce((corrects, simpleItem, index) => {
      const id = simpleItem.getAttribute('identifier') ?? '';
      if (responseDeclarations[responseIdentifier][id]) {
        corrects.push(index);
      }
      return corrects;
    }, [] as any);

    corrects[responseIdentifier] = correct;
  }

  return corrects;
}

function parseInteractions(root: Document, xml: string): QtiInteractions {
  const targets = [...xml.matchAll(/<([a-zA-Z]*Interaction) /g)].map(match => match[1]);
  return [...root.querySelectorAll(targets.join(', '))].map(interaction => {
    return {
      name: interaction.nodeName,
      responseIdentifier: interaction.getAttribute('responseIdentifier') ?? '',
      element: interaction,
    };
  });
}

export class QtiDocument {
  xml?: string;
  styleUrls: string[] = [];
  baseUrl = '';
  itemBody?: Element;
  stylesheets?: string[];
  responseDeclarations: QtiResponses = {};
  modalFeedbacks: QtiElements = {};
  rubricBlocks: QtiElements = {};
  interactions: QtiInteractions = [];
  correctResponses: QtiResponses = {};

  constructor() {}

  hasItemBody() {
    return this.itemBody && this.xml;
  }

  hasModalFeedback() {
    return Object.keys(this.modalFeedbacks).length > 0;
  }

  hasRubricBlock() {
    return Object.keys(this.rubricBlocks).length > 0;
  }

  async fetchStyleSheets(events: QtiViewerEvents) {
    this.stylesheets = await Promise.all(
      this.styleUrls.map(url => QtiDocument.fetch('style', url, events, this.baseUrl))
    );
  }

  render(root?: Element, renderOptions?: RenderOption): React.ReactNode {
    return renderQtiBody(root, renderOptions);
  }

  static async create(url: string, defaultStyleUrl?: string) {
    const baseUrl = getBaseUrl(url);
    const doc = new QtiDocument();
    const data = await fetchText(url);
    const xml = trimXml(data);
    const root = new DOMParser().parseFromString(xml, 'text/xml');

    doc.xml = url;
    doc.styleUrls = parseStylesheet(root, (href: any) => resolveBaseUrl(href || '', baseUrl));
    doc.baseUrl = baseUrl;

    if (defaultStyleUrl) {
      doc.styleUrls.unshift(defaultStyleUrl);
    }

    doc.rubricBlocks = parseRubricBlock(root);
    removeRubricBlock(root);
    doc.itemBody = parseItemBody(root);
    doc.modalFeedbacks = parseModalFeedbacks(root);
    doc.responseDeclarations = parseResponseDeclaration(root);
    doc.interactions = parseInteractions(root, xml);
    doc.correctResponses = parseCorrectResponses(root, doc.interactions, doc.responseDeclarations);

    return doc;
  }

  static async fetch(type: QtiViewerEventType, url: string, events: QtiViewerEvents, baseUrl?: string) {
    const resolvedUrl = events.onResolveUrl?.(url) ?? url;
    const fetchOptions = {
      type,
      url: resolvedUrl,
      baseUrl,
    };

    if (events.onFetchStart) {
      events.onFetchStart(fetchOptions);
    }

    const res = await fetchText(resolvedUrl);

    if (events.onFetchEnd) {
      events.onFetchEnd(fetchOptions);
    }

    return res;
  }
}
