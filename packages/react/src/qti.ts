import React from 'react';

import {
  createHTMLComponent,
  createInteractionChildComponent,
  isHTMLElement,
  isInteractionChildElement,
  createMathMLComponent,
} from './components';
import {
  createFlowGroupInteractionComponent,
  createInteractionComponent,
  isFlowGroupInteraction,
  isInteractionElement,
} from './interactions';
import {Props} from './types/component';
import {isElementNode, isRootElement, isTextNode, isMathMLElement, isModalFeedback} from './utils/node';

export type ItemBodyRenderOptions = {
  index: number;
  predicate: (node: Node, defaultProps: Props) => React.ReactNode;
};

export function renderItemBody(node: Node | Element, options: ItemBodyRenderOptions): React.ReactNode {
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

export function renderModalFeedback(node: Node | Element, options: ItemBodyRenderOptions): React.ReactNode {
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
