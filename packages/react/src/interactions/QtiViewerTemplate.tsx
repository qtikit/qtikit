import React, {useEffect, useMemo, useState} from 'react';
import responseProcessing from '@qtikit/scoring-engine/lib/responseProcessing';
import getResponseProcessingConfigFromDocument from '@qtikit/scoring-engine/lib/getResponseProcessingConfigFromDocument';

import {getBaseUrl, resolveUrl} from '../utils/url';
import QtiViewer, {QtiViewerProps} from '../';
import {fetchAssessment, QtiViewerErrorBoundary, ResourceSrc} from '../utils';

type InputState = QtiViewerProps['inputState'];

type QtiViewerTemplateProps = {
  assessmentItemSrc: string[] | string;
  stylesheetSrc: ResourceSrc;
};

type QtiViewerTemplateState = {src: string; content: string};

type QtiViewerViewProps = Omit<QtiViewerTemplateProps, 'assessmentItemSrc'> & {
  assessmentItemSrc: string;
  assessmentItemContent: string;
};

const QtiViewerView = ({assessmentItemSrc, assessmentItemContent, stylesheetSrc}: QtiViewerViewProps) => {
  const [inputState, setInputState] = useState<InputState>({});
  const responseProcessingResult = useResponseProcessingResult(assessmentItemContent, inputState);

  return (
    <>
      <div style={{flex: '1', padding: 10}}>
        <QtiViewerErrorBoundary>
          <QtiViewer
            assessmentItemSrc={assessmentItemContent}
            stylesheetSrc={resolveUrl(stylesheetSrc ? stylesheetSrc.toString() : 'default.css')}
            inputState={inputState}
            onChange={setInputState}
            resourceBaseUrl={getBaseUrl(assessmentItemSrc)}
          />
        </QtiViewerErrorBoundary>
      </div>
      <div style={{flex: '1', padding: 10}}>
        <h3>Input State</h3>
        <pre>{JSON.stringify(inputState, null, 2)}</pre>
        <h3>Response Processing Result</h3>
        <pre>{JSON.stringify(responseProcessingResult, null, 2)}</pre>
      </div>
    </>
  );
};

const QtiViewerTemplate = ({assessmentItemSrc, stylesheetSrc}: QtiViewerTemplateProps) => {
  const [assessmentItems, setAssessmentItems] = useState<QtiViewerTemplateState[]>([]);
  const assessmentItemsSrc = (Array.isArray(assessmentItemSrc) ? assessmentItemSrc : [assessmentItemSrc]).map(src =>
    resolveUrl(src)
  );

  useEffect(() => {
    const fetch = async () => {
      setAssessmentItems(await fetchAssessment(assessmentItemsSrc));
    };

    fetch();
  }, [assessmentItemsSrc]);

  return (
    <>
      {assessmentItems.map((assessmentItem, index) => (
        <div key={index} style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
          <QtiViewerView
            assessmentItemSrc={assessmentItem.src}
            assessmentItemContent={assessmentItem.content}
            stylesheetSrc={stylesheetSrc}
          />
        </div>
      ))}
    </>
  );
};

function useResponseProcessingResult(assessmentItemConent?: string, inputState: InputState = {}) {
  const responseProcessingResult = useMemo(() => {
    try {
      if (!assessmentItemConent) {
        return;
      }

      const document = new DOMParser().parseFromString(assessmentItemConent, 'text/xml');
      return responseProcessing(getResponseProcessingConfigFromDocument(document), inputState);
    } catch (e) {
      console.error(e);
      console.log(assessmentItemConent);
    }
  }, [assessmentItemConent, inputState]);
  return responseProcessingResult;
}

export {QtiViewerTemplate};
