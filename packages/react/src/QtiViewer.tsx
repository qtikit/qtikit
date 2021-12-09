import React, {useEffect, useMemo} from 'react';
import {UserInput} from '@qtikit/model/lib/user-input';

import * as Qti from './qti';
import {getBaseUrl, resolveUrl} from './utils/url';
import {trimXml} from './utils/xml';
import {useThrowError} from './utils/error';

interface AssessmentItem {
  itemBody: Element;
  styles: string[];
}

const ItemBody: React.FC<{itemBody: Element}> = React.memo(({itemBody}) => <>{Qti.renderItemBody(itemBody)}</>);

const Root: React.FC<AssessmentItem> = ({itemBody, styles}) => {
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
      <div data-qtikit>
        <ItemBody itemBody={itemBody} />
      </div>
    </>
  );
};

export interface QtiViewerProps {
  assessmentItemSrc: string;
  stylesheetSrc?: string;
  inputState: UserInput;
  onChange: (newState: UserInput) => void;
}

interface QtiViewerContextValue extends QtiViewerProps {
  baseUrl: string;
}

export const QtiViewerContext = React.createContext<QtiViewerContextValue>(null as any);

async function fetchStylesheet(href: string): Promise<string> {
  return fetch(href).then(response => response.text());
}

async function fetchAssessmentItem(assessmentSrc: string, stylesheetSrc?: string): Promise<AssessmentItem> {
  const xml = await fetch(assessmentSrc).then(response => response.text());
  const root = new DOMParser().parseFromString(trimXml(xml), 'text/xml');
  const [itemBody] = root.documentElement.getElementsByTagName('itemBody');

  if (!itemBody) {
    throw new Error('QTI itemBody is not found');
  }

  const baseUrl = getBaseUrl(assessmentSrc);
  const stylesheets = Array.from(root.getElementsByTagName('stylesheet'));
  const stylesheetSrcs = stylesheets.map(stylesheet => resolveUrl(stylesheet.getAttribute('href') || '', baseUrl));
  if (stylesheetSrc) stylesheetSrcs.unshift(stylesheetSrc);

  return {
    itemBody: itemBody,
    styles: await Promise.all(stylesheetSrcs.map(fetchStylesheet)),
  };
}

const defaultValue: QtiViewerContextValue = {
  baseUrl: '',
  assessmentItemSrc: '',
  stylesheetSrc: '',
  inputState: {},
  onChange: () => {},
};

const QtiViewer: React.FC<QtiViewerProps> = ({assessmentItemSrc, stylesheetSrc, ...props}) => {
  const [assessmentItem, setAssessmentItem] = React.useState<AssessmentItem | null>(null);
  const [throwError] = useThrowError();

  useEffect(() => {
    const loadAssessmentItem = async () => {
      try {
        setAssessmentItem(await fetchAssessmentItem(assessmentItemSrc, stylesheetSrc));
      } catch (e: any) {
        throwError(e);
      }
    };

    loadAssessmentItem();
  }, [assessmentItemSrc, stylesheetSrc, throwError]);

  return (
    <QtiViewerContext.Provider
      value={{
        ...defaultValue,
        baseUrl: getBaseUrl(assessmentItemSrc),
        ...props,
      }}>
      {assessmentItem && <Root {...assessmentItem} />}
    </QtiViewerContext.Provider>
  );
};

export default QtiViewer;
