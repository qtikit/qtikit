export const elementNode = 1 as const; // Node.ELEMENT_NODE
export const textNode = 3 as const; // Node.TEXT_NODE

export function getChildElements(el: Element): Iterable<Element> {
  // `@xmldom/xmldom` doesn't support `el.children`
  if (el.children) return el.children;
  const result: Element[] = [];
  for (let i = 0; i < el.childNodes.length; i++) {
    const child = el.childNodes[i];
    if (child.nodeType === elementNode) result.push(child as Element);
  }
  return result;
}
