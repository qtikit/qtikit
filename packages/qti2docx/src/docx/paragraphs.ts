import {Paragraph, Run, Table} from 'docx';

export type Paragraphs = (Paragraph | Table)[];

export type CreateParagraph = () => Paragraph;

export function createParagraph(): Paragraph {
  return new Paragraph({});
}

export interface ParagraphsBuilder {
  addRun(run: Run): void;
  addTable(table: Table): void;
  addParagraph(paragraph: Paragraph): void;
  flush(createParagraph?: CreateParagraph): void;
  readonly paragraphs: (Paragraph | Table)[];
}
export function createParagraphsBuilder(): ParagraphsBuilder {
  const result: (Paragraph | Table)[] = [];
  let currentParagraph = new Paragraph({});
  let runCnt = 0;
  return {
    addRun(run) {
      runCnt++;
      currentParagraph.addChildElement(run)
    },
    addTable(table) {
      flush();
      result.push(table);
    },
    addParagraph(paragraph) {
      flush();
      result.push(paragraph);
    },
    flush,
    get paragraphs() {
      flush();
      return result;
    },
  };
  function flush(createParagraph?: CreateParagraph): void {
    try {
      if (runCnt < 1) return;
      runCnt = 0;
      result.push(currentParagraph);
      createParagraph ??= () => new Paragraph({});
    } finally {
      if (createParagraph) currentParagraph = createParagraph();
    }
  }
}
