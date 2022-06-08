import toStyle from 'css-to-style';

import {Props} from '../types/component';

const NodeType = {
  ELEMENT_NODE: 1,
  TEXT_NODE: 3,
  COMMENT_NODE: 8,
  DOCUMENT_NODE: 9,
  DOCUMENT_TYPE_NODE: 10,
  DOCUMENT_FRAGMENT_NODE: 11,
};

type NodeType = typeof NodeType[keyof typeof NodeType];

const ITEMBODY_NAME = 'itemBody';
const MODAL_FEEDBACK_NAME = 'modalFeedback';
const RUBRIC_BLOCK_NAME = 'rubricBlock';
const MATH_ELEMENT_NAME = 'm:math';

export function isTextNode(node: Node): node is Text {
  return node.nodeType === NodeType.TEXT_NODE;
}

export function isElementNode(node: Node): node is Element {
  return node.nodeType === NodeType.ELEMENT_NODE;
}

export function isRootElement(node: Node): boolean {
  return (
    node.nodeName === ITEMBODY_NAME || node.nodeName === MODAL_FEEDBACK_NAME || node.nodeName === RUBRIC_BLOCK_NAME
  );
}

export function isMathMLElement(node: Node): boolean {
  return node.nodeName === MATH_ELEMENT_NAME;
}

export function getPropsByElement(element: Element, callbackfn?: (value: any) => any): Props {
  return element.attributes
    ? Object.fromEntries(
        Array.from(element.attributes).map(({name, value}) => (callbackfn ? callbackfn({name, value}) : [name, value]))
      )
    : {};
}

function stringifyProps(element: Element): string {
  return Object.entries(getPropsByElement(element))
    .map(([name, value]) => `${name}="${value}"`)
    .join(' ');
}

export function getOuterXmlWithoutNs(node: Node | Element): string {
  if (isTextNode(node)) {
    return node.nodeValue || '';
  } else if (isElementNode(node) && node.childNodes) {
    const children = Array.from(node.childNodes)
      .map(childNode => getOuterXmlWithoutNs(childNode))
      .join('');

    return `<${node.nodeName} ${stringifyProps(node)}>${children}</${node.nodeName}>`;
  }

  return '';
}

export function mapStyleProp({name, value}: {name: string; value: string}): [string, string | CSSStyleDeclaration] {
  if (name === 'style') {
    return ['style', toStyle(value)];
  }

  return [name, value];
}
