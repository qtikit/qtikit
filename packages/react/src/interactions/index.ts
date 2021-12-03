import React from 'react';

import {Props} from '../types/component';
import {getPropsByElement} from '../utils/node';
import ChoiceInteraction from './ChoiceInteraction';
import ExtendedTextInteraction from './ExtendedTextInteraction';
import GapMatchInteraction from './GapMatchInteraction';
import GraphicGapMatchInteraction from './GraphicGapMatchInteraction';
import HotspotInteraction from './HotspotInteraction';
import HottextInteraction from './HottextInteraction';
import MatchInteraction from './MatchInteraction';
import MediaInteraction from './MediaInteraction';
import OrderInteraction from './OrderInteraction';
import SliderInteraction from './SliderInteraction';
import TextEntryInteraction from './TextEntryInteraction';
import InlineChoiceInteraction from './InlineChoiceInteraction';

export const interactionElementNames = [
  'choiceInteraction',
  'extendedTextInteraction',
  'gapMatchInteraction',
  'graphicGapMatchInteraction',
  'hotspotInteraction',
  'hottextInteraction',
  'mediaInteraction',
  'orderInteraction',
  'sliderInteraction',
  'textEntryInteraction',
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

  const InteractionComponentMap = {
    choiceInteraction: ChoiceInteraction,
    extendedTextInteraction: ExtendedTextInteraction,
    gapMatchInteraction: GapMatchInteraction,
    graphicGapMatchInteraction: GraphicGapMatchInteraction,
    hotspotInteraction: HotspotInteraction,
    hottextInteraction: HottextInteraction,
    mediaInteraction: MediaInteraction,
    orderInteraction: OrderInteraction,
    textEntryInteraction: TextEntryInteraction,
    sliderInteraction: SliderInteraction,
  };
  const InteractionComponent = InteractionComponentMap[element.nodeName as InteractionElementName];

  return InteractionComponent ? React.createElement(InteractionComponent, props, children) : null;
}

export const flowGroupInteractionNames = ['matchInteraction', 'inlineChoiceInteraction'] as const;

export type FlowGroupInteractionName = typeof flowGroupInteractionNames[number];

export function isFlowGroupInteraction(node: Node): boolean {
  return flowGroupInteractionNames.includes(node.nodeName as any);
}

export interface FlowGroupInteractionProps {
  elementChildren: Element;
}

export function createFlowGroupInteractionComponent(element: Element, defaultProps: Props): React.ReactElement | null {
  const props = {
    ...defaultProps,
    elementChildren: element,
    ...getPropsByElement(element),
  };

  const componentMap = {
    matchInteraction: MatchInteraction,
    inlineChoiceInteraction: InlineChoiceInteraction,
  };
  const component = componentMap[element.nodeName as FlowGroupInteractionName];

  return component ? React.createElement<any>(component, props) : null;
}
