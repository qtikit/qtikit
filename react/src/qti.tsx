import React from "react";
import { DOMParser } from "@xmldom/xmldom";

import { createInteractionComponent } from "./interactions";

namespace QTI {
  const NodeType = {
    ELEMENT_NODE: 1,
    TEXT_NODE: 3,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9,
    DOCUMENT_TYPE_NODE: 10,
    DOCUMENT_FRAGMENT_NODE: 11,
  };

  type NodeType = typeof NodeType[keyof typeof NodeType];

  const InteractionElementTypes = [
    "customInteraction",
    "drawingInteraction",
    "gapMatchInteraction",
    "matchInteraction",
    "graphicGapMatchInteraction",
    "hotspotInteraction",
    "graphicOrderInteraction",
    "selectPointInteraction",
    "graphicAssociateInteraction",
    "sliderInteraction",
    "choiceInteraction",
    "mediaInteraction",
    "hottextInteraction",
    "orderInteraction",
    "extendedTextInteraction",
    "uploadInteraction",
    "associateInteraction",
    "feedbackBlock",
    "templateBlock",
    "infoControl",
    "math",
  ];

  const HTMLElementTypes = [
    "pre",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "address",
    "dl",
    "ol",
    "ul",
    "hr",
    "blockquote",
    "table",
    "div",
    "article",
    "aside",
    "audio",
    "figure",
    "header",
    "nav",
    "section",
    "video",
    "img",
    "rb",
    "rp",
    "rt",
    "rtc",
    "ruby",
    "em",
    "a",
    "code",
    "span",
    "acronym",
    "big",
    "tt",
    "kbd",
    "q",
    "i",
    "sup",
  ];

  function isElementNode(nodeType: number): boolean {
    return nodeType === NodeType.ELEMENT_NODE;
  }

  function isHTMLElementType(nodeName: string): boolean {
    return HTMLElementTypes.includes(nodeName);
  }

  function isInteractionElement(nodeName: string): boolean {
    return InteractionElementTypes.includes(nodeName);
  }

  function createHTMLComponent(
    node: Node,
    children: React.ReactElement[]
  ): React.ReactElement {
    return React.createElement(node.nodeName, null, ...children);
  }

  function parseItemBody(node: Node | Element): React.ReactElement[] {
    const component: React.ReactElement[] = [];

    for (let i = 0; i < node.childNodes.length; i++) {
      const childNode = node.childNodes[i];

      if (childNode.nodeName === "#text") {
        component.push(React.createElement("span", null, childNode.nodeValue));
      } else if (isHTMLElementType(childNode.nodeName)) {
        const children = parseItemBody(childNode);
        component.push(createHTMLComponent(childNode, children));
      } else if (isInteractionElement(childNode.nodeName)) {
        const interactionComponent = createInteractionComponent(childNode);
        if (interactionComponent) {
          component.push(interactionComponent);
        }
      } else {
        // MAYBE createCustomComponent
        throw new Error(`Unsupported node type: ${childNode.nodeName}`);
      }
    }

    return component;
  }

  export function createComponent(itemBodyXML: string): React.ReactElement[] {
    const root = new DOMParser().parseFromString(itemBodyXML, "text/xml");
    const itemBody = root.documentElement.getElementsByTagName("itemBody")[0];

    if (!itemBody) {
      throw new Error("QTI itemBody is not found");
    }

    return parseItemBody(itemBody);
  }
}

export default QTI;
