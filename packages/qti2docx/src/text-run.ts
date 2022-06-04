import {IRunOptions, TextRun} from 'docx';

export interface RunStyleContext {
  bold?: boolean;
  italic?: boolean;
}

export type CreateTextRun = (text: string, runStyleContext: RunStyleContext) => TextRun;

export function createTextRun(text: string, runStyleContext: RunStyleContext): TextRun {
  type Writeable<T> = { -readonly [P in keyof T]: T[P] };
  const options: Writeable<IRunOptions> = { text };
  if (runStyleContext.bold) options.bold = true;
  if (runStyleContext.italic) options.italics = true;
  return new TextRun(options);
}
