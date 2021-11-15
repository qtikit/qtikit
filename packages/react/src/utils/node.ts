import {Props} from '@src/types/component';

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
  return Array.from(element.attributes).reduce((acc, cur) => ({...acc, [cur.name]: cur.value}), {});
}
