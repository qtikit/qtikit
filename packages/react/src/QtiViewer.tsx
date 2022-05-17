import React, {useEffect, useMemo} from 'react';
import {UserInput} from '@qtikit/model/lib/user-input';

import * as Qti from './qti';
import {getBaseUrl, resolveUrl} from './utils/url';
import {readCorrectResponse, trimXml} from './utils/xml';
import {useThrowError} from './utils/error';
import {Props} from './types/component';
import {isTextNode} from './utils/node';
import {KaTeXMatchArray} from './components/KaTeX';
import {createKaTeXComponent} from './components';

interface AssessmentItem {
  assessmentSrc: string;
  itemBody: Element;
  styles: string[];
  correctResponses: any;
  renderOptions: Qti.ItemBodyRenderOptions;
}

const ItemBody: React.FC<{itemBody: Element; renderOptions: Qti.ItemBodyRenderOptions}> = React.memo(
  ({itemBody, renderOptions}) => <>{Qti.renderItemBody(itemBody, renderOptions)}</>
);

const Root: React.FC<AssessmentItem> = ({itemBody, renderOptions, styles}) => {
  // useMemo is not fit for multiple ref scenario. but I have no idea for now.
  // This code can become problematic later for the following reasons:
  // https://reactjs.org/docs/hooks-reference.html#usememo
  // > You may rely on useMemo as a performance optimization, not as a semantic guarantee.
  const styleRefs = useMemo(() => styles.map(() => React.createRef<HTMLStyleElement>()), [styles]);
  useEffect(() => {
    for (const ref of styleRefs) {
      if (!ref.current?.sheet) continue;
      const cssRules = ref.current.sheet.cssRules;
      for (const rule of cssRules) {
        const oldSelectorText = (rule as any).selectorText as string;
        const newSelectorText = oldSelectorText
          .split(',')
          .map(s => `[data-qtikit] ${s}`)
          .join(',');
        (rule as any).selectorText = newSelectorText;
      }
    }
  }, [styleRefs]);
  return (
    <>
      {styles.map((style, index) => (
        <style key={index} ref={styleRefs[index]}>
          {style}
        </style>
      ))}
      <ItemBody itemBody={itemBody} renderOptions={renderOptions} />
    </>
  );
};

type QtiViewerFormulaInput = {
  type: 'mathml' | 'latex';
  match: (target: string) => KaTeXMatchArray;
};

type QtiViewerOptions = {
  showCorrectResponse?: boolean;
  formulaInput?: QtiViewerFormulaInput;
};

export interface QtiViewerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  assessmentItemSrc: string;
  stylesheetSrc?: string;
  inputState: UserInput;
  onChange?: (newState: UserInput) => void;
  options?: QtiViewerOptions;
}

interface QtiViewerContextValue extends QtiViewerProps {
  baseUrl: string;
  correctResponses?: any;
}

export const QtiViewerContext = React.createContext<QtiViewerContextValue>(null as any);

async function fetchStylesheet(href: string): Promise<string> {
  return fetch(href).then(response => response.text());
}

async function parseAssessmentItem(
  assessmentSrc: string,
  stylesheetSrc?: string,
  options?: QtiViewerOptions
): Promise<AssessmentItem> {
  const xml = trimXml(await fetch(assessmentSrc).then(response => response.text()));
  const root = new DOMParser().parseFromString(xml, 'text/xml');
  const [itemBody] = root.documentElement.getElementsByTagName('itemBody');

  if (!itemBody) {
    throw new Error('QTI itemBody is not found');
  }

  const baseUrl = getBaseUrl(assessmentSrc);
  const stylesheets = Array.from(root.getElementsByTagName('stylesheet'));
  const stylesheetSrcs = stylesheets.map(stylesheet => resolveUrl(stylesheet.getAttribute('href') || '', baseUrl));
  if (stylesheetSrc) {
    stylesheetSrcs.unshift(stylesheetSrc);
  }

  const renderOptions: Qti.ItemBodyRenderOptions = {
    index: 0,
    predicate: (node: Node, defaultProps: Props) => {
      if (!options?.formulaInput) {
        return null;
      }

      if (options?.formulaInput.type === 'latex' && isTextNode(node)) {
        const text = node.nodeValue || '';
        const matches = options.formulaInput.match(text);
        console.log('match', node.nodeValue, matches, defaultProps);
        return createKaTeXComponent({text, matches}, defaultProps);
      }

      return null;
    },
  };

  return {
    assessmentSrc: assessmentSrc,
    itemBody: itemBody,
    styles: await Promise.all(stylesheetSrcs.map(fetchStylesheet)),
    correctResponses: options?.showCorrectResponse ? readCorrectResponse(root) : null,
    renderOptions,
  };
}

const defaultValue: QtiViewerContextValue = {
  baseUrl: '',
  assessmentItemSrc: '',
  stylesheetSrc: '',
  inputState: {},
};

const QtiViewer: React.FC<QtiViewerProps> = props => {
  const {assessmentItemSrc, stylesheetSrc, inputState, onChange, options, ...divProps} = props;
  const [assessmentItem, setAssessmentItem] = React.useState<AssessmentItem | null>(null);
  const throwError = useThrowError();

  useEffect(() => {
    setAssessmentItem(null);

    const loadAssessmentItem = async () => {
      try {
        setAssessmentItem(await parseAssessmentItem(assessmentItemSrc, stylesheetSrc, options));
      } catch (e: any) {
        throwError(e);
      }
    };

    loadAssessmentItem();
    return () => {
      setAssessmentItem(null);
    };
  }, [assessmentItemSrc, options, stylesheetSrc, throwError]);

  return (
    assessmentItem && (
      <QtiViewerContext.Provider
        value={{
          ...defaultValue,
          ...props,
          baseUrl: getBaseUrl(assessmentItem.assessmentSrc),
          correctResponses: assessmentItem?.correctResponses,
        }}>
        <div data-qtikit {...divProps}>
          {assessmentItem && <Root {...assessmentItem} />}
        </div>
      </QtiViewerContext.Provider>
    )
  );
};

export default QtiViewer;
