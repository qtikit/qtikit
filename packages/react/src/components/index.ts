import React from 'react';

import {Props} from '@src/types/component';
import {getPropsByElement} from '@src/utils/node';
import Prompt from '@src/components/Prompt';
import SimpleChoice from '@src/components/SimpleChoice';
import ImageHtml from '@src/components/ImageHtml';
import ObjectHtml from '@src/components/ObjectHtml';

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
] as const;

export type HTMLElementName = typeof htmlElementNames[number];

export function isHTMLElement(node: Node): boolean {
  return htmlElementNames.includes(node.nodeName as any);
}

export const htmlComponetNames = ['img', 'object'] as const;

export type HtmlComponetName = typeof htmlComponetNames[number];

export const interactionChildElementNames = ['prompt', 'simpleChoice'] as const;

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

  const InteractionChildComponentMap: Record<InteractionChildElementName, React.FC> = {
    prompt: Prompt,
    simpleChoice: SimpleChoice,
  };
  const InteractionChildComponent = InteractionChildComponentMap[element.nodeName as InteractionChildElementName];

  return InteractionChildComponent ? React.createElement(InteractionChildComponent, props, children) : null;
}

export function createHTMLComponent(
  element: Element,
  defaultProps: Props,
  children: React.ReactNode[]
): React.ReactElement {
  const props = {...defaultProps, ...getPropsByElement(element)};

  const HtmlComponentMap: Record<HtmlComponetName, React.FC> = {
    img: ImageHtml,
    object: ObjectHtml,
  };

  const htmlComponent = HtmlComponentMap[element.nodeName as HtmlComponetName];
  return htmlComponent
    ? React.createElement(htmlComponent, props, children)
    : React.createElement(element.nodeName, props, ...children);
}
