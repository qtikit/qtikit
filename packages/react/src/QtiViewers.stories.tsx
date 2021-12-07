import {UserInput} from '@qtikit/model/lib/user-input';
import React, {useEffect, useState} from 'react';

import QtiViewer, {QtiViewerProps} from './QtiViewer';
import {getPathName} from './utils/url';

function urlize(url: string) {
  return /^(http|https):\/\//.test(url) ? url : `https://${url}`;
}

const QtiViewerContainer = ({assessmentItemSrc, inputState, onChange}: QtiViewerProps) => {
  const [error, setError] = useState<Error>(null);

  useEffect(() => {
    setError(null);
  }, [assessmentItemSrc, inputState, onChange]);

  return (
    <>
      <h2>
        QTI: <a href={assessmentItemSrc}>{getPathName(assessmentItemSrc)}</a>
      </h2>
      {!error ? (
        <QtiViewer
          assessmentItemSrc={assessmentItemSrc}
          inputState={inputState}
          onChange={onChange}
          onError={setError}
        />
      ) : (
        <div>{error.toString()}</div>
      )}
    </>
  );
};

const QtiViewersTemplate = ({assessmentItemSrc}) => {
  const [assessmentItems, setAssessmentItems] = useState([]);
  const [inputState, setInputState] = useState<UserInput>({});

  useEffect(() => {
    setAssessmentItems(assessmentItemSrc.trim().split('\n').map(urlize));
  }, [assessmentItemSrc]);

  return (
    <>
      <h1>Input Assessment Urls</h1>
      <div>
        {assessmentItems.map((assessmentItemSrc, index) => (
          <QtiViewerContainer
            key={index}
            assessmentItemSrc={assessmentItemSrc}
            inputState={inputState}
            onChange={setInputState}
          />
        ))}
      </div>
    </>
  );
};

export const QtiViewers = QtiViewersTemplate.bind({});

QtiViewers.args = {
  assessmentItemSrc: new URL(location.href).searchParams.get('assessmentItemSrc') ?? '',
};

export default {
  title: 'Tests/QtiViewers',
};
