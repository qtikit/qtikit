import React, { useState } from 'react';
import { UserInput } from '@qtikit/model/lib/user-input';
import QtiViewer from '@qtikit/react/lib/QtiViewer';

const assessments = [];

const Assessment = ({ assessmentItemSrc }: { assessmentItemSrc: string }) => {
  const [inputState, setInputState] = useState<UserInput>({});
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

const Submission = () => {
  const [itemIndex, setItemIndex] = useState(0);

  const next = () => {
    if (itemIndex < assessments.length - 1) {
      setItemIndex(itemIndex + 1);
    }
  };

  const prev = () => {
    if (itemIndex > 0) {
      setItemIndex(itemIndex - 1);
    }
  };

  return (
    <>
      <div>
        <h1>Submission</h1>
      </div>
      <div>
        <button onClick={prev}>Previous</button>
        <button onClick={next}>Next</button>
      </div>
      <div>
        <Assessment assessmentItemSrc={assessments[itemIndex]} />
      </div>
    </>
  );
};

const App = () => <Submission />;

export default App;
