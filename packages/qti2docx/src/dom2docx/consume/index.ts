import {CreateParagraph, ParagraphsBuilder } from '../../docx/paragraphs';
import {RunStyleContext, createTextRun} from '../../docx/text-run';
import {elementNode, textNode} from '../../dom';
import div from './div';
import span from './span';
import heading from './heading';

export interface ConsumeConfig {
  el: Element;
  isBlock: boolean;
  paragraphsBuilder: ParagraphsBuilder;
  runStyleContext: RunStyleContext;
}
export type ConsumeFn = (config: ConsumeConfig) => void;
export type ConsumeTable = { [tagName: string]: ConsumeFn; };

export const consumeElement: ConsumeFn = (config) => {
  if (config.el.tagName in consumeTable) {
    consumeTable[config.el.tagName](config);
  } else {
    config.paragraphsBuilder.addRun(
      createTextRun(`TODO: <${config.el.tagName}>`, {})
    );
  }
};

export const consumeTable: ConsumeTable = createConsumeTable();

export function createConsumeTable(): ConsumeTable {
  return {
    ...div(),
    ...span(),
    ...heading(),
  };
}

export interface ConsumeChildrenConfig extends ConsumeConfig {
  createParagraph?: CreateParagraph;
  childrenAreBlock?: boolean;
}
export function consumeChildren(config: ConsumeChildrenConfig) {
  const {
    el,
    isBlock,
    paragraphsBuilder,
    runStyleContext,
    createParagraph,
    childrenAreBlock,
  } = config;
  try {
    if (isBlock || createParagraph) paragraphsBuilder.flush(createParagraph);
    for (const child of el.childNodes) {
      if (child.nodeType === textNode) {
        paragraphsBuilder.addRun(
          createTextRun(child.textContent ?? '', runStyleContext)
        );
      } else if (child.nodeType === elementNode) {
        consumeElement({
          ...config,
          el: child as Element,
          isBlock: childrenAreBlock || false,
        });
      }
    }
  } finally {
    if (isBlock || createParagraph) paragraphsBuilder.flush();
  }
}
