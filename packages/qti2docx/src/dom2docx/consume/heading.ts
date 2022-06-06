import {HeadingLevel, Paragraph} from 'docx';
import {consumeChildren, ConsumeTable} from '.';

export default function createConsumeTable(): ConsumeTable {
  const result: ConsumeTable = {};
  const headings = [
    ['h1', HeadingLevel.HEADING_1],
    ['h2', HeadingLevel.HEADING_2],
    ['h3', HeadingLevel.HEADING_3],
    ['h4', HeadingLevel.HEADING_4],
    ['h5', HeadingLevel.HEADING_5],
    ['h6', HeadingLevel.HEADING_6],
  ] as const;
  for (const [tagName, heading] of headings) {
    result[tagName] = (config) => consumeChildren({
      ...config,
      createParagraph: () => new Paragraph({ heading }),
    });
  }
  return result;
}
