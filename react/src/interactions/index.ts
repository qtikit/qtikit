import React from "react";

import { Props } from '@src/types/component';
import { getPropsByElement } from '@src/utils/node';
import AssociateInteraction from "@src/interactions/AssociateInteraction";
import ChoiceInteraction from "@src/interactions/ChoiceInteraction";
import CustomInteraction from "@src/interactions/CustomInteraction";
import DrawingInteraction from "@src/interactions/DrawingInteraction";
import ExtendedTextInteraction from "@src/interactions/ExtendedTextInteraction";
import FeedbackBlock from "@src/interactions/FeedbackBlock";
import GapMatchInteraction from "@src/interactions/GapMatchInteraction";
import GraphicAssociateInteraction from "@src/interactions/GraphicAssociateInteraction";
import GraphicGapMatchInteraction from "@src/interactions/GraphicGapMatchInteraction";
import GraphicOrderInteraction from "@src/interactions/GraphicOrderInteraction";
import HotspotInteraction from "@src/interactions/HotspotInteraction";
import HottextInteraction from "@src/interactions/HottextInteraction";
import InfoControl from "@src/interactions/InfoControl";
import MatchInteraction from "@src/interactions/MatchInteraction";
import MediaInteraction from "@src/interactions/MediaInteraction";
import OrderInteraction from "@src/interactions/OrderInteraction";
import SelectPointInteraction from "@src/interactions/SelectPointInteraction";
import SliderInteraction from "@src/interactions/SliderInteraction";
import TemplateBlock from "@src/interactions/TemplateBlock";
import UploadInteraction from "@src/interactions/UploadInteraction";

export const interactionElementNames = [
  "associateInteraction",
  "choiceInteraction",
  "customInteraction",
  "drawingInteraction",
  "extendedTextInteraction",
  "feedbackBlock",
  "gapMatchInteraction",
  "graphicAssociateInteraction",
  "graphicGapMatchInteraction",
  "graphicOrderInteraction",
  "hotspotInteraction",
  "hottextInteraction",
  "infoControl",
  "matchInteraction",
  "mediaInteraction",
  "orderInteraction",
  "selectPointInteraction",
  "sliderInteraction",
  "templateBlock",
  "uploadInteraction",
] as const;

export type InteractionElementName = typeof interactionElementNames[number];

export function isInteractionElement(node: Node): boolean {
  return interactionElementNames.includes(node.nodeName as any);
}

export function createInteractionComponent(
  element: Element,
  defaultProps: Props,
  children: React.ReactNode[]
): React.ReactElement | null {
  const props = { ...defaultProps, ...getPropsByElement(element) };

  const InteractionComponentMap: Record<InteractionElementName, React.FC> = {
    associateInteraction: AssociateInteraction,
    choiceInteraction: ChoiceInteraction,
    customInteraction: CustomInteraction,
    drawingInteraction: DrawingInteraction,
    extendedTextInteraction: ExtendedTextInteraction,
    feedbackBlock: FeedbackBlock,
    gapMatchInteraction: GapMatchInteraction,
    graphicAssociateInteraction: GraphicAssociateInteraction,
    graphicGapMatchInteraction: GraphicGapMatchInteraction,
    graphicOrderInteraction: GraphicOrderInteraction,
    hotspotInteraction: HotspotInteraction,
    hottextInteraction: HottextInteraction,
    infoControl: InfoControl,
    matchInteraction: MatchInteraction,
    mediaInteraction: MediaInteraction,
    orderInteraction: OrderInteraction,
    selectPointInteraction: SelectPointInteraction,
    sliderInteraction: SliderInteraction,
    templateBlock: TemplateBlock,
    uploadInteraction: UploadInteraction,
  };
  const InteractionComponent = InteractionComponentMap[element.nodeName as InteractionElementName];

  return InteractionComponent ? React.createElement(InteractionComponent, props, children) : null;
}
