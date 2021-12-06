import React, {useEffect} from 'react';
import {UserInput} from '@qtikit/model/lib/user-input';

import * as Qti from './qti';
import {getBaseUrl} from './utils/url';
import {trimXml} from './utils/xml';

interface AssessmentItem {
  itemBody: Element;
  styles: string[];
}

const ItemBody: React.FC<{itemBody: Element}> = React.memo(({itemBody}) => <>{Qti.renderItemBody(itemBody)}</>);

const Root: React.FC<AssessmentItem> = ({itemBody, styles}) => {
  return (
    <>
      {styles.map((style, index) => (
        <style key={index}>{style}</style>
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

function setStyleRoot(style: string): string {
  return style.replace(/(.*?){/g, `[data-qtikit] $1 {`);
}

function createLinkElement(href: string): HTMLStyleElement {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  return link;
}

async function fetchAssessmentItem(assessmentSrc: string, stylesheetSrc?: string): Promise<AssessmentItem> {
  const xml = await fetch(assessmentSrc).then(response => response.text());
  const root = new DOMParser().parseFromString(trimXml(xml), 'text/xml');
  const [itemBody] = root.documentElement.getElementsByTagName('itemBody');

  if (!itemBody) {
    throw new Error('QTI itemBody is not found');
  }

  const stylesheets = [...root.getElementsByTagName('stylesheet')];
  if (stylesheetSrc) {
    stylesheets.push(createLinkElement(stylesheetSrc));
  }

  const baseUrl = getBaseUrl(assessmentSrc);

  return {
    itemBody: itemBody,
    styles: await Promise.all(
      Array.from(stylesheets).map(stylesheet =>
        fetchStylesheet(`${new URL(stylesheet.getAttribute('href') || '', baseUrl).href}`).then(setStyleRoot)
      )
    ),
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

  useEffect(() => {
    fetchAssessmentItem(assessmentItemSrc, stylesheetSrc).then(setAssessmentItem);
  }, [assessmentItemSrc, stylesheetSrc]);

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
