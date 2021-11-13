import React, {useEffect} from 'react';
import {UserInput} from '@qtikit/model/lib/user-input';

import * as Qti from './qti';
import {getBaseUrl} from './utils/url';

export const QtiViewerContext = React.createContext<{
  baseUrl: string;
}>(null as any);

export interface QtiViewerProps {
  assessmentItemSrc: string;
  inputState: UserInput;
  onChange: (newState: UserInput) => void;
}

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
    <QtiViewerContext.Provider value={{baseUrl: getBaseUrl(props.assessmentItemSrc)}}>
      {xml && Qti.createComponent(xml)}
    </QtiViewerContext.Provider>
  );
};

export default QtiViewer;
