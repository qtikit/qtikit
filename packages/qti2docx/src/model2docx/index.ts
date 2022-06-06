import {
  AssessmentItem,
  BlockContentModel,
  BlockGroup,
  BlockStaticGroup,
  FlowContentModel,
  FlowGroup,
  FlowStaticGroup,
  HTMLText,
  InlineGroup,
  InlineStaticGroup,
} from '@qtikit/model/lib/qti2_2';
import {
  defaultCase,
  findChildByType,
  matchSelection,
} from '@qtikit/model/lib/lens';
import {HeadingLevel, Paragraph, TextRun} from 'docx';
import {
  createParagraph,
  CreateParagraph,
  createParagraphsBuilder,
  ParagraphsBuilder,
  Paragraphs,
} from '../docx/paragraphs';
import {
  RunStyleContext,
  createTextRun,
  CreateTextRun,
} from '../docx/text-run';

export interface AssessmentItemToDocxParagraphsConfig {
  assessmentItem: AssessmentItem
}
export function assessmentItemToDocxParagraphs(
  config: AssessmentItemToDocxParagraphsConfig
): Paragraphs {
  const itemBody = findChildByType(config.assessmentItem.$children, 'itemBody');
  if (!itemBody) return [];
  const paragraphsBuilder = createParagraphsBuilder();
  for (const [, {$selection}] of itemBody.$children) {
    matchSelection($selection, {
      rubricBlock: () => {
        paragraphsBuilder.addRun(new TextRun('<TODO: rubricBlock>'));
      },
      blockGroup: (blockGroup) => consumeGroup({
        paragraphsBuilder,
        runStyleContext: {},
        isBlockGroup: true,
        group: blockGroup,
      }),
    })
  }
  return paragraphsBuilder.paragraphs;
}

type Group = BlockGroup | BlockStaticGroup | FlowGroup | FlowStaticGroup | InlineGroup | InlineStaticGroup;
interface ConsumeGroupConfig {
  paragraphsBuilder: ParagraphsBuilder;
  runStyleContext: RunStyleContext;
  isBlockGroup: boolean;
  group: Group;
}
function consumeGroup({
  paragraphsBuilder,
  runStyleContext,
  isBlockGroup,
  group: {$selection},
}: ConsumeGroupConfig): void {
  if (isBlockGroup) paragraphsBuilder.flush();
  matchSelection($selection, {
    [defaultCase]() {
      paragraphsBuilder.addRun(new TextRun(`<TODO: ${$selection[0]}>`));
    },
    blockContentModel(blockContentModel) {
      consumeContentModel({
        paragraphsBuilder,
        runStyleContext,
        contentModel: blockContentModel,
      });
    },
    flowContentModel(flowContentModel) {
      consumeContentModel({
        paragraphsBuilder,
        runStyleContext,
        contentModel: flowContentModel,
      });
    }
    // TODO: math
    // TODO: choiceInteraction
  });
}

type ContentModel = BlockContentModel | FlowContentModel | InlineGroup;
interface ConsumeContentModelConfig {
  paragraphsBuilder: ParagraphsBuilder;
  runStyleContext: RunStyleContext;
  contentModel: ContentModel;
}
function consumeContentModel({
  paragraphsBuilder,
  runStyleContext,
  contentModel: {$selection},
}: ConsumeContentModelConfig): void {
  matchSelection($selection, {
    [defaultCase]() {
      paragraphsBuilder.addRun(new TextRun(`<TODO: ${$selection[0]}>`));
    },
    span: consumeHtmlText,
    b: (b) => consumeHtmlText(b, { ...runStyleContext, bold: true }),
    strong: (strong) => consumeHtmlText(strong, { ...runStyleContext, bold: true }),
    i: (i) => consumeHtmlText(i, { ...runStyleContext, italic: true }),
    em: (em) => consumeHtmlText(em, { ...runStyleContext, italic: true }),
    div: (div) => {
      paragraphsBuilder.flush();
      for (const child of div.$children) {
        matchSelection(child, {
          $text(text) {
            paragraphsBuilder.addRun(createTextRun(text, runStyleContext))
          },
          divSelection({$selection}) {
            matchSelection($selection, {
              [defaultCase]() {
                paragraphsBuilder.addRun(new TextRun(`<TODO: ${$selection[0]}>`));
              },
              flowGroup: (flowGroup) => consumeGroup({
                paragraphsBuilder,
                runStyleContext: {},
                isBlockGroup: false,
                group: flowGroup,
              }),
            });
          },
        });
      }
      paragraphsBuilder.flush();
    },
    p: consumeBlockHtmlText,
    pre: consumeBlockHtmlText,
    h1: (h1) => consumeBlockHtmlText(h1, () => new Paragraph({
      heading: HeadingLevel.HEADING_1,
    })),
    h2: (h2) => consumeBlockHtmlText(h2, () => new Paragraph({
      heading: HeadingLevel.HEADING_2,
    })),
    h3: (h3) => consumeBlockHtmlText(h3, () => new Paragraph({
      heading: HeadingLevel.HEADING_3,
    })),
    h4: (h4) => consumeBlockHtmlText(h4, () => new Paragraph({
      heading: HeadingLevel.HEADING_4,
    })),
    h5: (h5) => consumeBlockHtmlText(h5, () => new Paragraph({
      heading: HeadingLevel.HEADING_5,
    })),
    h6: (h6) => consumeBlockHtmlText(h6, () => new Paragraph({
      heading: HeadingLevel.HEADING_6,
    })),
    // TODO: table, img, br, hr, ol, ul...
  });
  function consumeHtmlText(
    htmlText: HTMLText,
    _runStyleContext: RunStyleContext = runStyleContext,
    _createTextRun: CreateTextRun = createTextRun,
  ) {
    for (const child of htmlText.$children) {
      matchSelection(child, {
        $text(text) {
          paragraphsBuilder.addRun(_createTextRun(text, _runStyleContext))
        },
        inlineGroup(inlineGroup) {
          consumeGroup({
            paragraphsBuilder,
            runStyleContext: _runStyleContext,
            isBlockGroup: false,
            group: inlineGroup,
          });
        },
      });
    }
  }
  function consumeBlockHtmlText(
    htmlText: HTMLText,
    _createParagraph: CreateParagraph = createParagraph,
    _runStyleContext: RunStyleContext = runStyleContext,
    _createTextRun: CreateTextRun = createTextRun,
  ) {
    paragraphsBuilder.flush(_createParagraph);
    consumeHtmlText(htmlText, _runStyleContext, _createTextRun);
    paragraphsBuilder.flush();
  }
}
