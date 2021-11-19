import React, {useEffect} from 'react';
import {UserInput} from '@qtikit/model/lib/user-input';
import ReactDOM from 'react-dom';

import * as Qti from './qti';
import {getBaseUrl} from './utils/url';
import {trimXml} from './utils/xml';

interface AssessmentItem {
  itemBody: Element;
  stylesheets: HTMLLinkElement[];
}

interface ShadowRootProp {
  assessmentItem: AssessmentItem;
}

type ReactShadowRoot = ShadowRoot | Element;

const ShadowRoot: React.FC<ShadowRootProp> = ({assessmentItem}) => {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const [shadowRoot, setShadowRoot] = React.useState<ReactShadowRoot | null>(null);
  const ItemBody = React.memo(() => <>{Qti.renderItemBody(assessmentItem.itemBody)}</>);

  useEffect(() => {
    const shadow = parentRef.current?.attachShadow({
      mode: 'open',
    });

    if (shadow) {
      assessmentItem.stylesheets.forEach(s => shadow.appendChild(s));
      setShadowRoot(shadow);
    }
  }, [parentRef, assessmentItem.stylesheets]);

  return <div ref={parentRef}>{shadowRoot && ReactDOM.createPortal(<ItemBody />, shadowRoot as Element)}</div>;
};

export interface QtiViewerProps {
  assessmentItemSrc: string;
  inputState: UserInput;
  onChange: (newState: UserInput) => void;
}

interface QtiViewerContextValue extends QtiViewerProps {
  baseUrl: string;
}

export const QtiViewerContext = React.createContext<QtiViewerContextValue>(null as any);

function createLinkElement(href: string): HTMLLinkElement {
  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', href);

  return link;
}

async function fetchAssessmentItem(url: string): Promise<AssessmentItem> {
  const xml = await fetch(url).then(res => res.text());
  const root = new DOMParser().parseFromString(trimXml(xml), 'text/xml');
  const itemBody = root.documentElement.getElementsByTagName('itemBody')[0];

  if (!itemBody) {
    throw new Error('QTI itemBody is not found');
  }

  const baseUrl = getBaseUrl(url);
  const stylesheets = root.getElementsByTagName('stylesheet');

  return {
    itemBody: itemBody,
    stylesheets: Array.from(stylesheets).map((s: Element) => createLinkElement(`${baseUrl}/${s.getAttribute('href')}`)),
  };
}

const defaultValue: QtiViewerContextValue = {
  baseUrl: '',
  assessmentItemSrc: '',
  inputState: {},
  onChange: () => {},
};

const QtiViewer: React.FC<QtiViewerProps> = props => {
  const [assessmentItem, setAssessmentItem] = React.useState<AssessmentItem | null>(null);

  useEffect((): void => {
    const load = async () => {
      setAssessmentItem(await fetchAssessmentItem(props.assessmentItemSrc));
    };

    load();
  }, [props.assessmentItemSrc]);

  return (
    <QtiViewerContext.Provider
      value={{
        ...defaultValue,
        baseUrl: getBaseUrl(props.assessmentItemSrc),
        ...props,
      }}>
      {assessmentItem && <ShadowRoot assessmentItem={assessmentItem} />}
    </QtiViewerContext.Provider>
  );
};

export default QtiViewer;
