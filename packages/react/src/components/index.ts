import React from 'react';

import {Props} from '../types/component';
import {getOuterXmlWithoutNs, getPropsByElement, mapStyleProp} from '../utils/node';
import AssociableHotspot from './AssociableHotspot';
import Gap from './Gap';
import GapImg from './GapImg';
import GapText from './GapText';
import HotspotChoice from './HotspotChoice';
import Hottext from './Hottext';
import Prompt from './Prompt';
import SimpleChoice from './SimpleChoice';
import InlineChoice from './InlineChoice';
import ImageHtml from './ImageHtml';
import ObjectHtml from './ObjectHtml';
import MathML from './MathML';
import {LaTeX} from './LaTeX';

export const htmlElementNames = [
  'pre',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'address',
  'dl',
  'ol',
  'ul',
  'hr',
  'blockquote',
  'table',
  'div',
  'article',
  'aside',
  'audio',
  'figure',
  'header',
  'nav',
  'section',
  'video',
  'img',
  'rb',
  'rp',
  'rt',
  'rtc',
  'ruby',
  'em',
  'a',
  'code',
  'span',
  'acronym',
  'big',
  'tt',
  'kbd',
  'q',
  'i',
  'sup',
  'li',
  'b',
  'br',
  'object',
  'strong',
  'bdo',
  'table',
  'tbody',
  'thead',
  'tfoot',
  'tr',
  'td',
  'th',
] as const;

export type HTMLElementName = typeof htmlElementNames[number];

export function isHTMLElement(node: Node): boolean {
  return htmlElementNames.includes(node.nodeName as any);
}

export const htmlComponetNames = ['img', 'object'] as const;

export type HtmlComponetName = typeof htmlComponetNames[number];

export const interactionChildElementNames = [
  'associableHotspot',
  'gap',
  'gapImg',
  'gapText',
  'hotspotChoice',
  'hottext',
  'prompt',
  'simpleChoice',
  'inlineChoice',
] as const;

export type InteractionChildElementName = typeof interactionChildElementNames[number];

export function isInteractionChildElement(node: Node): boolean {
  return interactionChildElementNames.includes(node.nodeName as any);
}

export function createInteractionChildComponent(
  element: Element,
  defaultProps: Props,
  children: React.ReactNode[]
): React.ReactElement | null {
  const props = {...defaultProps, ...getPropsByElement(element)};

  const InteractionChildComponentMap = {
    associableHotspot: AssociableHotspot,
    gap: Gap,
    gapImg: GapImg,
    gapText: GapText,
    hotspotChoice: HotspotChoice,
    hottext: Hottext,
    prompt: Prompt,
    simpleChoice: SimpleChoice,
    inlineChoice: InlineChoice,
  } as {[key in InteractionChildElementName]: React.FC<any>};
  const InteractionChildComponent = InteractionChildComponentMap[element.nodeName as InteractionChildElementName];

  return InteractionChildComponent ? React.createElement(InteractionChildComponent, props, children) : null;
}

export function createHTMLComponent(
  element: Element,
  defaultProps: Props,
  children: React.ReactNode[]
): React.ReactElement {
  const props = {...defaultProps, ...getPropsByElement(element, mapStyleProp)};

  const HtmlComponentMap: Record<HtmlComponetName, React.FC> = {
    img: ImageHtml,
    object: ObjectHtml,
  };

  return React.createElement(
    HtmlComponentMap[element.nodeName as HtmlComponetName] ?? element.nodeName,
    props,
    children
  );
}

export function createMathMLComponent(element: Element, defaultProps: Props): React.ReactNode {
  if (element.parentNode?.nodeName === 'inlineChoice') {
    return getOuterXmlWithoutNs(element);
  } else {
    return React.createElement(MathML, {
      ...defaultProps,
      ...getPropsByElement(element),
      mathML: getOuterXmlWithoutNs(element),
    });
  }
}

export function createLaTeXComponent(tex: string, defaultProps: Props): React.ReactNode {
  return React.createElement(LaTeX, {
    tex,
    ...defaultProps,
  });
}
