import React from 'react';

import {
  createHTMLComponent,
  createInteractionChildComponent,
  isHTMLElement,
  isInteractionChildElement,
  createMathComponent,
} from './components';
import {createInteractionComponent, isInteractionElement} from './interactions';
import {isElementNode, isRootElement, isTextNode, isMathElement} from './utils/node';

export function parseXml(node: Node | Element, index = 0): React.ReactNode {
  const {childNodes} = node;

  const defaultProps = {
    key: `qti-component-${index}`,
  };

  if (isTextNode(node)) {
    return node.nodeValue;
  } else if (isMathElement(node)) {
    return createMathComponent(node as Element, defaultProps);
  } else if (isElementNode(node)) {
    const children = childNodes ? Array.from(childNodes).map(childNode => parseXml(childNode, ++index)) : [];

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
