import React from 'react';

import {Props} from '../types/component';
import {getPropsByElement} from '../utils/node';
import AssociateInteraction from '../interactions/AssociateInteraction';
import ChoiceInteraction from '../interactions/ChoiceInteraction';
import CustomInteraction from '../interactions/CustomInteraction';
import DrawingInteraction from '../interactions/DrawingInteraction';
import ExtendedTextInteraction from '../interactions/ExtendedTextInteraction';
import GapMatchInteraction from '../interactions/GapMatchInteraction';
import GraphicAssociateInteraction from '../interactions/GraphicAssociateInteraction';
import GraphicGapMatchInteraction from '../interactions/GraphicGapMatchInteraction';
import GraphicOrderInteraction from '../interactions/GraphicOrderInteraction';
import HotspotInteraction from '../interactions/HotspotInteraction';
import HottextInteraction from '../interactions/HottextInteraction';
import MatchInteraction from '../interactions/MatchInteraction';
import MediaInteraction from '../interactions/MediaInteraction';
import OrderInteraction from '../interactions/OrderInteraction';
import SelectPointInteraction from '../interactions/SelectPointInteraction';
import SliderInteraction from '../interactions/SliderInteraction';
import TextEntryInteraction from '../interactions/TextEntryInteraction';
import InlineChoiceInteraction from '../interactions/InlineChoiceInteraction';

export const interactionElementNames = [
  'associateInteraction',
  'choiceInteraction',
  'customInteraction',
  'drawingInteraction',
  'extendedTextInteraction',
  'gapMatchInteraction',
  'graphicAssociateInteraction',
  'graphicGapMatchInteraction',
  'graphicOrderInteraction',
  'hotspotInteraction',
  'hottextInteraction',
  'matchInteraction',
  'mediaInteraction',
  'orderInteraction',
  'selectPointInteraction',
  'sliderInteraction',
  'textEntryInteraction',
  'inlineChoiceInteraction',
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
  const props = {...defaultProps, ...getPropsByElement(element)};

  const InteractionComponentMap: Record<InteractionElementName, React.FC> = {
    associateInteraction: AssociateInteraction,
    choiceInteraction: ChoiceInteraction,
    customInteraction: CustomInteraction,
    drawingInteraction: DrawingInteraction,
    extendedTextInteraction: ExtendedTextInteraction,
    gapMatchInteraction: GapMatchInteraction,
    graphicAssociateInteraction: GraphicAssociateInteraction,
    graphicGapMatchInteraction: GraphicGapMatchInteraction,
    graphicOrderInteraction: GraphicOrderInteraction,
    hotspotInteraction: HotspotInteraction,
    hottextInteraction: HottextInteraction,
    matchInteraction: MatchInteraction,
    mediaInteraction: MediaInteraction,
    orderInteraction: OrderInteraction,
    selectPointInteraction: SelectPointInteraction,
    textEntryInteraction: TextEntryInteraction,
    inlineChoiceInteraction: InlineChoiceInteraction,
    sliderInteraction: SliderInteraction,
  };
  const InteractionComponent = InteractionComponentMap[element.nodeName as InteractionElementName];

  return InteractionComponent ? React.createElement(InteractionComponent, props, children) : null;
}
