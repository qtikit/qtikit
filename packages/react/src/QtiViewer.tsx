import React, {useEffect} from 'react';
import {UserInput} from '@qtikit/model/lib/user-input';

import * as Qti from './qti';
import {getBaseUrl} from './utils/url';

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
      {xml && Qti.createComponent(xml)}
    </QtiViewerContext.Provider>
  );
};

export default QtiViewer;
