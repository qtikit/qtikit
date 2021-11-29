import React, {useEffect, useMemo, useState} from 'react';
import {ComponentStory} from '@storybook/react';
import responseProcessing from '@qtikit/scoring-engine/lib/responseProcessing';
import getResponseProcessingConfigFromDocument from '@qtikit/scoring-engine/lib/getResponseProcessingConfigFromDocument';

import QtiViewer, {QtiViewerProps} from '../';

type InputState = QtiViewerProps['inputState'];

export const QtiViewerTemplate: ComponentStory<typeof QtiViewer> = props => {
  const assessmentItemSrc = `/tests/${props.assessmentItemSrc}`;
  const [inputState, setInputState] = useState<InputState>({});
  const assessmentItemDocument = useAssignmentItemDocument(assessmentItemSrc);
  const responseProcessingResult = useResponseProcessingResult(assessmentItemDocument, inputState);
  return (
    <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
      <div style={{flex: '1'}}>
        <QtiViewer assessmentItemSrc={assessmentItemSrc} inputState={inputState} onChange={setInputState} />
      </div>
      <div style={{flex: '1'}}>
        <h3>Input State</h3>
        <pre>{JSON.stringify(inputState, null, 2)}</pre>
        <h3>Response Processing Result</h3>
        <pre>{JSON.stringify(responseProcessingResult, null, 2)}</pre>
      </div>
    </div>
  );
};

function useAssignmentItemDocument(assessmentItemSrc: string) {
  const [assessmentItemDocument, setAssessmentItemDocument] = useState<Document>();
  useEffect(() => {
    fetch(assessmentItemSrc)
      .then(response => response.text())
      .then(text => {
        const document = new DOMParser().parseFromString(text, 'text/xml');
        setAssessmentItemDocument(document);
      });
  }, [assessmentItemSrc]);
  return assessmentItemDocument;
}

function useResponseProcessingResult(assessmentItemDocument?: Document, inputState: InputState = {}) {
  const responseProcessingResult = useMemo(() => {
    if (!assessmentItemDocument) return;
    return responseProcessing(getResponseProcessingConfigFromDocument(assessmentItemDocument), inputState);
  }, [assessmentItemDocument, inputState]);
  return responseProcessingResult;
}
