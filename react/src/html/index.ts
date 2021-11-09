import React from "react";

interface Attributes {
  [key: string]: string | number | boolean | undefined;
}

export function getAttributes(el: Element): Attributes {
  const attributes: Attributes = {};
  for (let i = 0; i < el.attributes.length; i++) {
    const attr = el.attributes[i];
    attributes[attr.name] = attr.value;
  }

  return attributes;
}

export function createHTMLComponent(
  node: Element,
  props: Attributes,
  children: React.ReactElement[]
): React.ReactElement {
  return React.createElement(
    node.nodeName,
    {
      ...props,
      ...getAttributes(node),
    },
    ...children
  );
}
