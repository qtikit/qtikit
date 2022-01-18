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
  inputState?: InputState;
  onChange?: (newState: InputState) => void;
};

type QtiViewerTemplateState = {src: string; content: string};

type QtiViewerViewProps = Omit<QtiViewerTemplateProps, 'assessmentItemSrc'> & {
  assessmentItemSrc: string;
  assessmentItemContent?: string;
};

export const QtiViewerView = ({
  assessmentItemSrc,
  assessmentItemContent,
  stylesheetSrc,
  inputState,
  onChange,
}: QtiViewerViewProps) => {
  const responseProcessingResult = useResponseProcessingResult(assessmentItemContent, inputState);

  return (
    <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
      <div style={{flex: '1', padding: 10}}>
        <QtiViewerErrorBoundary>
          <QtiViewer
            assessmentItemSrc={assessmentItemContent ?? assessmentItemSrc}
            stylesheetSrc={resolveUrl(stylesheetSrc ? stylesheetSrc.toString() : 'default.css')}
            inputState={inputState ?? {}}
            onChange={onChange}
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
    </div>
  );
};

const QtiViewerTemplate = ({assessmentItemSrc, stylesheetSrc}: QtiViewerTemplateProps) => {
  const [inputState, setInputState] = useState<InputState>({});
  const [assessmentItems, setAssessmentItems] = useState<QtiViewerTemplateState[]>([]);
  const assessmentItemsSrc = React.useMemo(
    () => (Array.isArray(assessmentItemSrc) ? assessmentItemSrc : [assessmentItemSrc]).map(src => resolveUrl(src)),
    [assessmentItemSrc]
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
        <QtiViewerView
          key={index}
          assessmentItemSrc={assessmentItem.src}
          assessmentItemContent={assessmentItem.content}
          stylesheetSrc={stylesheetSrc}
          inputState={inputState}
          onChange={setInputState}
        />
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
