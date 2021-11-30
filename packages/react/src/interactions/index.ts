import React from 'react';

import {Props} from '../types/component';
import {getPropsByElement} from '../utils/node';
import AssociateInteraction from './AssociateInteraction';
import ChoiceInteraction from './ChoiceInteraction';
import CustomInteraction from './CustomInteraction';
import DrawingInteraction from './DrawingInteraction';
import ExtendedTextInteraction from './ExtendedTextInteraction';
import GapMatchInteraction from './GapMatchInteraction';
import GraphicAssociateInteraction from './GraphicAssociateInteraction';
import GraphicGapMatchInteraction from './GraphicGapMatchInteraction';
import GraphicOrderInteraction from './GraphicOrderInteraction';
import HotspotInteraction from './HotspotInteraction';
import HottextInteraction from './HottextInteraction';
import MatchInteraction from './MatchInteraction';
import MediaInteraction from './MediaInteraction';
import OrderInteraction from './OrderInteraction';
import SelectPointInteraction from './SelectPointInteraction';
import SliderInteraction from './SliderInteraction';
import TextEntryInteraction from './TextEntryInteraction';
import InlineChoiceInteraction from './InlineChoiceInteraction';

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

export const flowGroupInteractionNames = ['matchInteraction'] as const;

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

  const componentMap: Record<FlowGroupInteractionName, React.FC> = {
    matchInteraction: MatchInteraction,
  };
  const component = componentMap[element.nodeName as FlowGroupInteractionName];

  return component ? React.createElement<FlowGroupInteractionProps>(component, props) : null;
}
