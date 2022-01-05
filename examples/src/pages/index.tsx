import React, {ChangeEvent, useEffect, useState} from 'react';
import {useCookies, CookiesProvider} from 'react-cookie';
import {UserInput} from '@qtikit/model/lib/user-input';
import QtiViewer from '@qtikit/react/lib/QtiViewer';

const Assessment = ({assessmentItemSrc}: {assessmentItemSrc: string}) => {
  const [inputState, setInputState] = useState<UserInput>({});

  useEffect(() => {
    setInputState({});
  }, [assessmentItemSrc, setInputState]);

  return (
    <>
      {
        <QtiViewer
          assessmentItemSrc={assessmentItemSrc}
          inputState={inputState}
          onChange={setInputState}
          stylesheetSrc={'/default.css'}
        />
      }
    </>
  );
};

function urlize(url: string) {
  return /^(http|https):\/\//.test(url) ? url : `https://${url}`;
}

function normalizeAssessmentItemUrls(assessmentItemSrc: string): string[] {
  return assessmentItemSrc
    .trim()
    .split('\n')
    .filter(s => s.length > 0)
    .map(urlize);
}

function hasElement(arr: any[] | null, index: number) {
  return arr && arr.length > 0 && index <= arr.length - 1;
}

const Submission = () => {
  const [cookie, setCookie] = useCookies(['assessment']);
  const [assessment, setAssesessment] = useState('');
  const [assessmentItems, setAssessmentItems] = useState([] as string[]);
  const [assessmentIndex, setAssessmentIndex] = useState(0);

  const next = () => {
    if (assessmentIndex < assessmentItems.length - 1) {
      setAssessmentIndex(assessmentIndex + 1);
    }
  };

  const prev = () => {
    if (assessmentIndex > 0) {
      setAssessmentIndex(assessmentIndex - 1);
    }
  };

  const handleAssessmentChange = ({target: {value}}: ChangeEvent<HTMLTextAreaElement>) => {
    if (value && value.length > 0) {
      setCookie('assessment', value);
      setAssesessment(value);
      setAssessmentItems(normalizeAssessmentItemUrls(value));
    }
  };

  useEffect(() => {
    const assessment = cookie['assessment'];
    if (assessment && assessment.length > 0) {
      setAssesessment(assessment);
      setAssessmentItems(normalizeAssessmentItemUrls(assessment));
    }
  }, [cookie]);

  return (
    <>
      <div>
        <h1>Submission</h1>
      </div>
      <div>
        <textarea onChange={handleAssessmentChange} value={assessment} rows={5} cols={100} />
      </div>
      <div>
        <button onClick={prev}>Previous</button>
        <button onClick={next}>Next</button>
      </div>
      <div>
        {hasElement(assessmentItems, assessmentIndex) && (
          <Assessment assessmentItemSrc={assessmentItems[assessmentIndex]} />
        )}
      </div>
    </>
  );
};

const App = () => (
  <CookiesProvider>
    <Submission />
  </CookiesProvider>
);

export default App;
