import {createParagraphsBuilder, Paragraphs} from '../docx/paragraphs';
import {getChildElements} from '../dom';
import {consumeElement} from './consume';

export type Fetch = (fromUrl: string, targetUrl: string) => Uint8Array;

export interface AssessmentItemToDocxParagraphsConfig {
  parseXml: (text: string) => Document;
  assessmentItemXml: string;
  assessmentItemXmlUrl: string;
  fetch: Fetch;
}
export function assessmentItemToDocxParagraphs(
  config: AssessmentItemToDocxParagraphsConfig
): Paragraphs {
  const {
    parseXml,
    assessmentItemXml,
    assessmentItemXmlUrl,
    fetch,
  } = config;
  const document = parseXml(assessmentItemXml);
  const itemBody = document.getElementsByTagName('itemBody')[0];
  if (!itemBody) return [];
  const paragraphsBuilder = createParagraphsBuilder();
  for (const el of getChildElements(itemBody)) {
    consumeElement({
      currentUrl: assessmentItemXmlUrl,
      fetch,
      el,
      isBlock: true,
      paragraphsBuilder,
      runStyleContext: {},
    });
  }
  return paragraphsBuilder.paragraphs;
}
