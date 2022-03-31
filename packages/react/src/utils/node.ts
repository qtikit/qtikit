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

const ROOT_ELEMENT_NAME = 'itemBody';
const MATH_ELEMENT_NAME = 'm:math';

export function isTextNode(node: Node): node is Text {
  return node.nodeType === NodeType.TEXT_NODE;
}

export function isElementNode(node: Node): node is Element {
  return node.nodeType === NodeType.ELEMENT_NODE;
}

export function isRootElement(node: Node): boolean {
  return node.nodeName === ROOT_ELEMENT_NAME;
}

export function isMathElement(node: Node): boolean {
  return node.nodeName === MATH_ELEMENT_NAME;
}

export function getPropsByElement(element: Element): Props {
  return element.attributes
    ? Object.fromEntries(Array.from(element.attributes).map(({name, value}) => [name, value]))
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
