import React from "react";

import createCustomInteraction from "./custom-interaction";
import createDrawingInteraction from "./drawing-interaction";
import createGapMatchInteraction from "./gap-match-interaction";
import createMatchInteraction from "./match-interaction";
import createGraphicGapMatchInteraction from "./gap-match-interaction";
import createHotspotInteraction from "./hotspot-interaction";
import createGraphicOrderInteraction from "./graphic-order-interaction";
import createSelectPointInteraction from "./select-point-interaction";
import createGraphicAssociateInteraction from "./graphic-associate-interaction";
import createSliderInteraction from "./slider-interaction";
import createChoiceInteraction from "./choice-interaction";
import createMediaInteraction from "./media-interaction";
import createHottextInteraction from "./hottext-interaction";
import createOrderInteraction from "./order-interaction";
import createExtendedTextInteraction from "./extended-text-interaction";
import createUploadInteraction from "./upload-interaction";
import createAssociateInteraction from "./associate-interaction";
import createFeedbackBlock from "./feedback-block";
import createTemplateBlock from "./template-block";
import createInfoControl from "./info-control";
import createMath from "./math";

export function createInteractionComponent(
  node: Node | Element
): React.ReactElement | null {
  switch (node.nodeName) {
    case "customInteraction":
      return createCustomInteraction(node);
    case "drawingInteraction":
      return createDrawingInteraction(node);
    case "gapMatchInteraction":
      return createGapMatchInteraction(node);
    case "matchInteraction":
      return createMatchInteraction(node);
    case "graphicGapMatchInteraction":
      return createGraphicGapMatchInteraction(node);
    case "hotspotInteraction":
      return createHotspotInteraction(node);
    case "graphicOrderInteraction":
      return createGraphicOrderInteraction(node);
    case "selectPointInteraction":
      return createSelectPointInteraction(node);
    case "graphicAssociateInteraction":
      return createGraphicAssociateInteraction(node);
    case "sliderInteraction":
      return createSliderInteraction(node);
    case "choiceInteraction":
      return createChoiceInteraction(node);
    case "mediaInteraction":
      return createMediaInteraction(node);
    case "hottextInteraction":
      return createHottextInteraction(node);
    case "orderInteraction":
      return createOrderInteraction(node);
    case "extendedTextInteraction":
      return createExtendedTextInteraction(node);
    case "uploadInteraction":
      return createUploadInteraction(node);
    case "associateInteraction":
      return createAssociateInteraction(node);
    case "feedbackBlock":
      return createFeedbackBlock(node);
    case "templateBlock":
      return createTemplateBlock(node);
    case "infoControl":
      return createInfoControl(node);
    case "math":
      return createMath(node);
    default:
      return null;
  }
}
