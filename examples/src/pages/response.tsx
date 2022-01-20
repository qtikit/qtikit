import React, {ChangeEvent, useEffect, useState} from 'react';
import {useCookies, CookiesProvider} from 'react-cookie';
import QtiViewer from '@qtikit/react/lib/';

// initResponses: ['SC-5063469', 'SC-5063536', 'SC-5062522', 'SC-5066035', 'SC-5063677']
const useUserSubmisstions = (initResponses: string[]) => {
  console.log('initResponses', initResponses);
  const responses = React.useMemo(
    () =>
      initResponses.map(response => {
        return {
          RESPONSE1: [response],
        };
      }),
    [initResponses]
  );

  return responses;
};

const Assessments = ({assessmentItems, initResponses}: {assessmentItems: string[]; initResponses: string[]}) => {
  const responses = useUserSubmisstions(initResponses);

  return (
    <>
      {responses.length > 0 &&
        assessmentItems.map((assessmentItemSrc, index) => (
          <div key={assessmentItemSrc}>
            <h1>Response #{index + 1}</h1>
            <QtiViewer
              assessmentItemSrc={assessmentItemSrc}
              stylesheetSrc={'/default.css'}
              // must not be provided or skipped
              onChange={undefined}
              // user response must be provided
              inputState={responses[index % responses.length]}
              // showCorrectResponse must be true
              options={{
                showCorrectResponse: true,
              }}
            />
            <br />
          </div>
        ))}
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

const Submission = () => {
  const [cookie, setCookie] = useCookies(['assessment', 'responses']);
  const [assessmentItems, setAssessmentItems] = useState([] as string[]);
  const [responses, setResponses] = useState([] as string[]);

  const handleAssessmentChange = ({target: {value}}: ChangeEvent<HTMLTextAreaElement>) => {
    if (value && value.length > 0) {
      const assessments = normalizeAssessmentItemUrls(value);
      setAssessmentItems(assessments);
      setCookie('assessment', assessments.join('\n'));
    }
  };

  const handleresponsesChange = ({target: {value}}: ChangeEvent<HTMLTextAreaElement>) => {
    if (value && value.length > 0) {
      setResponses(value.split('\n'));
      setCookie('responses', value);
    }
  };

  useEffect(() => {
    const assessment = cookie['assessment'];
    if (assessment && assessment.length > 0) {
      setAssessmentItems(normalizeAssessmentItemUrls(assessment));
    }

    const responses = cookie['responses'];
    if (responses && responses.length > 0) {
      setResponses(responses.split('\n'));
    }
  }, [cookie]);

  return (
    <>
      <div>
        <h1>Submission</h1>
      </div>
      <div>
        <div>
          <h3> Assessment Urls</h3>
          <textarea onChange={handleAssessmentChange} value={assessmentItems.join('\n')} rows={5} cols={100} />
        </div>
        <div>
          <h3>response List. WARNING, All of response must be in XMLs</h3>
          <textarea onChange={handleresponsesChange} value={responses.join('\n')} rows={5} cols={100} />
        </div>
      </div>
      <div>
        <Assessments assessmentItems={assessmentItems} initResponses={responses} />
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
