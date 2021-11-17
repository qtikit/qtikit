import React, {useEffect} from 'react';
import {DOMParser} from '@xmldom/xmldom';
import {UserInput} from '@qtikit/model/lib/user-input';

import * as Qti from './qti';
import {getBaseUrl} from './utils/url';
import {trimXml} from './utils/xml';

interface ViewerProps {
  xml: string;
}

const Viewer = React.memo<ViewerProps>(({xml}) => {
  const root = new DOMParser().parseFromString(trimXml(xml), 'text/xml');
  const itemBody = root.documentElement.getElementsByTagName('itemBody')[0];

  if (!itemBody) {
    throw new Error('QTI itemBody is not found');
  }

  return <>{Qti.parseXml(itemBody)}</>;
});

export interface QtiViewerProps {
  assessmentItemSrc: string;
  inputState: UserInput;
  onChange: (newState: UserInput) => void;
}

interface QtiViewerContextValue extends QtiViewerProps {
  baseUrl: string;
}

export const QtiViewerContext = React.createContext<QtiViewerContextValue>(null as any);

const defaultValue: QtiViewerContextValue = {
  baseUrl: '',
  assessmentItemSrc: '',
  inputState: {},
  onChange: () => {},
};

const QtiViewer: React.FC<QtiViewerProps> = props => {
  const [xml, setXml] = React.useState<string>('');

  useEffect((): void => {
    const loadXml = async () => {
      const xml = await fetch(props.assessmentItemSrc).then(response => response.text());
      setXml(xml);
    };

    loadXml();
  }, [props.assessmentItemSrc]);

  return (
    <QtiViewerContext.Provider
      value={{
        ...defaultValue,
        baseUrl: getBaseUrl(props.assessmentItemSrc),
        ...props,
      }}>
      {xml && <Viewer xml={xml} />}
    </QtiViewerContext.Provider>
  );
};

export default QtiViewer;
