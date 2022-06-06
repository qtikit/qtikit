import {createParagraphsBuilder, Paragraphs} from '../docx/paragraphs';
import {getChildElements} from '../dom';
import {consumeElement} from './consume';

export interface ItemBodyDomToDocxParagraphsConfig {
  itemBody: Element;
}

export function itemBodyDomToDocxParagraphs(
  config: ItemBodyDomToDocxParagraphsConfig
): Paragraphs {
  const paragraphsBuilder = createParagraphsBuilder();
  for (const el of getChildElements(config.itemBody)) {
    consumeElement({
      el,
      isBlock: true,
      paragraphsBuilder,
      runStyleContext: {},
    });
  }
  return paragraphsBuilder.paragraphs;
}
