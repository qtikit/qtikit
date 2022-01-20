import React, {useEffect, useMemo, useState} from 'react';
import {ComponentStory} from '@storybook/react';
import responseProcessing from '@qtikit/scoring-engine/lib/responseProcessing';
import getResponseProcessingConfigFromDocument from '@qtikit/scoring-engine/lib/getResponseProcessingConfigFromDocument';
import {UserInput} from '@qtikit/model/lib/user-input';

import {resolveUrl} from '../utils/url';
import QtiViewer from '../';

export const QtiViewerTemplate: ComponentStory<typeof QtiViewer> = ({
  assessmentItemSrc,
  stylesheetSrc,
  inputState: initialInputState,
  options,
}) => {
  const url = {
    assessmentItemSrc: resolveUrl(assessmentItemSrc),
    stylesheetSrc: resolveUrl(stylesheetSrc ?? 'default.css'),
  };

  const [inputState, setInputState] = useState<UserInput>(initialInputState ?? {});

  const assessmentItemDocument = useAssignmentItemDocument(assessmentItemSrc);
  const responseProcessingResult = useResponseProcessingResult(assessmentItemDocument, inputState);

  return (
    <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
      <div style={{flex: '1', padding: 10}}>
        <QtiViewer
          assessmentItemSrc={url.assessmentItemSrc}
          stylesheetSrc={url.stylesheetSrc}
          inputState={inputState}
          onChange={!options?.showCorrectResponse ? setInputState : undefined}
          options={options}
        />
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

function useAssignmentItemDocument(assessmentItemSrc: string) {
  const [assessmentItemDocument, setAssessmentItemDocument] = useState<Document>();
  useEffect(() => {
    fetch(assessmentItemSrc)
      .then(response => response.text())
      .then(text => {
        try {
          const document = new DOMParser().parseFromString(text, 'text/xml');
          setAssessmentItemDocument(document);
        } catch (e) {
          console.error(e);
        }
      });
  }, [assessmentItemSrc]);
  return assessmentItemDocument;
}

function useResponseProcessingResult(assessmentItemDocument?: Document, inputState: UserInput = {}) {
  const responseProcessingResult = useMemo(() => {
    try {
      if (!assessmentItemDocument) return;
      return responseProcessing(getResponseProcessingConfigFromDocument(assessmentItemDocument), inputState);
    } catch (e) {
      console.error(e);
      console.log(assessmentItemDocument?.documentElement?.outerHTML);
    }
  }, [assessmentItemDocument, inputState]);
  return responseProcessingResult;
}
