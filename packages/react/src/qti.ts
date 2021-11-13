import React from 'react';
import {DOMParser} from '@xmldom/xmldom';

import {
  createHTMLComponent,
  createInteractionChildComponent,
  isHTMLElement,
  isInteractionChildElement,
} from './components';
import {createInteractionComponent, isInteractionElement} from './interactions';

const NodeType = {
  ELEMENT_NODE: 1,
  TEXT_NODE: 3,
  COMMENT_NODE: 8,
  DOCUMENT_NODE: 9,
  DOCUMENT_TYPE_NODE: 10,
  DOCUMENT_FRAGMENT_NODE: 11,
};

type NodeType = typeof NodeType[keyof typeof NodeType];

const ROOT_ELEMENT_NAME = 'itemBody';

function isTextNode(node: Node): node is Text {
  return node.nodeType === NodeType.TEXT_NODE;
}

function isElementNode(node: Node): node is Element {
  return node.nodeType === NodeType.ELEMENT_NODE;
}

function isRootElement(node: Node): boolean {
  return node.nodeName === ROOT_ELEMENT_NAME;
}

function parseXml(node: Node | Element, index = 0): React.ReactNode {
  const {childNodes} = node;

  const defaultProps = {
    key: `qti-component-${index}`,
  };

  if (isTextNode(node)) {
    return node.nodeValue;
  } else if (isElementNode(node)) {
    const children = node.childNodes ? Array.from(childNodes).map(childNode => parseXml(childNode, ++index)) : [];

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

export function createComponent(xml: string): React.ReactNode {
  const root = new DOMParser().parseFromString(xml, 'text/xml');
  const itemBody = root.documentElement.getElementsByTagName('itemBody')[0];

  if (!itemBody) {
    throw new Error('QTI itemBody is not found');
  }

  return parseXml(itemBody);
}
