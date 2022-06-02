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
import {getBaseUrl, isHttpUrl} from '../utils/url';
import {isXml, reduceElement, trimXml} from '../utils/xml';

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

export type QtiXml = {
  root: Document;
  xml: string;
};

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

function parseItemBody(xml: QtiXml) {
  const [itemBody] = xml.root.documentElement.getElementsByTagName('itemBody');

  if (!itemBody) {
    throw new Error('QTI itemBody is not found');
  }

  return itemBody;
}

function parseResponseDeclaration(xml: QtiXml): QtiElements {
  return reduceElement('responseDeclaration', xml.root.documentElement, (correct, response) => {
    const identifier = response.getAttribute('identifier');
    correct[identifier] = reduceElement('value', response, (values, value) => {
      values[value.textContent] = true;
      return values;
    });

    return correct;
  });
}

function parseModalFeedbacks(xml: QtiXml): QtiElements {
  return reduceElement('modalFeedback', xml.root.documentElement, (feedbacks, feedback) => {
    const identifier = feedback.getAttribute('identifier');
    feedbacks[identifier] = feedback;

    return feedbacks;
  });
}

function parseStylesheet(xml: QtiXml): string[] {
  return Array.from(xml.root.getElementsByTagName('stylesheet')).map(
    stylesheet => stylesheet.getAttribute('href') ?? ''
  );
}

function parseRubricBlock(xml: QtiXml) {
  return reduceElement('rubricBlock', xml.root.documentElement, (rubrics, rubric) => {
    const id = rubric.getAttribute('id');
    rubrics[id] = rubric;

    return rubrics;
  });
}

function removeRubricBlock(xml: QtiXml) {
  for (const rubricBlock of xml.root.getElementsByTagName('rubricBlock')) {
    rubricBlock?.parentNode?.removeChild(rubricBlock);
  }
}

async function getXml(data: string): Promise<QtiXml> {
  const xml = isXml(data) ? trimXml(data) : isHttpUrl(data) ? await fetchText(data) : undefined;

  if (!xml) {
    throw new Error(`Invalid XML format, ${data}`);
  }

  return {
    root: new DOMParser().parseFromString(xml, 'text/xml'),
    xml: xml,
  };
}

function parseCorrectResponses(interactions: QtiInteractions, responseDeclarations: QtiResponses) {
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

function parseInteractions(xml: QtiXml): QtiInteractions {
  const targets = [...xml.xml.matchAll(/<([a-zA-Z]*Interaction) /g)].map(match => match[1]);
  return targets.length > 0
    ? [...xml.root.querySelectorAll(targets.join(', '))].map(interaction => {
        return {
          name: interaction.nodeName,
          responseIdentifier: interaction.getAttribute('responseIdentifier') ?? '',
          element: interaction,
        };
      })
    : [];
}

export class QtiDocument {
  xml?: QtiXml;
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

  render(root?: Element, renderOptions?: RenderOption): React.ReactNode {
    return renderQtiBody(root, renderOptions);
  }

  static async create(xml: string, defaultStyleUrl?: string) {
    const doc = new QtiDocument();

    doc.xml = await getXml(xml);
    doc.baseUrl = isHttpUrl(xml) ? getBaseUrl(xml) : '';
    doc.styleUrls = parseStylesheet(doc.xml);

    if (defaultStyleUrl) {
      doc.styleUrls.unshift(defaultStyleUrl);
    }

    doc.rubricBlocks = parseRubricBlock(doc.xml);
    removeRubricBlock(doc.xml);
    doc.itemBody = parseItemBody(doc.xml);
    doc.modalFeedbacks = parseModalFeedbacks(doc.xml);
    doc.responseDeclarations = parseResponseDeclaration(doc.xml);
    doc.interactions = parseInteractions(doc.xml);
    doc.correctResponses = parseCorrectResponses(doc.interactions, doc.responseDeclarations);

    return doc;
  }
}
