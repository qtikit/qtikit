import {UserInput} from '@qtikit/model/lib/user-input';
import React, {useEffect, useState} from 'react';

import QtiViewer from './QtiViewer';
import {getPathName, resolveUrl} from './utils/url';

class QtiViewerErrorBoundary extends React.Component<{children: any}, {hasError: false; error: Error | null}> {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  componentDidCatch(error) {
    this.setState({
      error: error,
    });
  }

  render() {
    return this.state.hasError ? (
      <h3 style={{color: 'red'}}>{this.state.error && this.state.error.toString()}</h3>
    ) : (
      this.props.children
    );
  }
}

const QtiViewersTemplate = ({assessmentItemSrc, stylesheetSrc}) => {
  const [assessmentItems, setAssessmentItems] = useState([]);
  const [inputState, setInputState] = useState<UserInput>({});

  useEffect(() => {
    setAssessmentItems(normalizeAssessmentItemUrls(assessmentItemSrc));
  }, [assessmentItemSrc]);

  return (
    <>
      <h1>Input Assessment Urls</h1>
      <div>
        {assessmentItems.map((assessmentItemSrc, index) => (
          <div key={index}>
            <hr />
            <h2>
              QTI: <a href={assessmentItemSrc}>{getPathName(assessmentItemSrc)}</a>
            </h2>
            <QtiViewerErrorBoundary key={assessmentItemSrc}>
              <QtiViewer
                assessmentItemSrc={assessmentItemSrc}
                inputState={inputState}
                onChange={setInputState}
                stylesheetSrc={stylesheetSrc}
              />
            </QtiViewerErrorBoundary>
          </div>
        ))}
      </div>
    </>
  );
};

export const QtiViewers = QtiViewersTemplate.bind({});

QtiViewers.storyName = 'QtiViewers';
QtiViewers.args = {
  assessmentItemSrc: getAssessmentItemSrcParam(),
  stylesheetSrc: resolveUrl('default.css'),
};

const QtiSlideViewerTemplate = ({assessmentItemSrc, stylesheetSrc}) => {
  const [assessmentItems, setAssessmentItems] = useState([]);
  const [assessmentIndex, setAssessmentIndex] = useState(0);
  const [inputState, setInputState] = useState<UserInput>({});

  const prev = React.useCallback((): void => {
    if (assessmentIndex > 0) {
      setAssessmentIndex(assessmentIndex - 1);
    }
  }, [assessmentIndex]);

  const next = React.useCallback((): void => {
    if (assessmentIndex < assessmentItems.length - 1) {
      setAssessmentIndex(assessmentIndex + 1);
    }
  }, [assessmentIndex, assessmentItems]);

  useEffect(() => {
    setAssessmentItems(normalizeAssessmentItemUrls(assessmentItemSrc));
  }, [assessmentItemSrc]);

  return (
    <>
      <h1>Input Assessment Urls in Slide</h1>
      <div>
        <h2>
          QTI: <a href={assessmentItems[assessmentIndex]}>{getPathName(assessmentItems[assessmentIndex])}</a>
        </h2>
        <div>
          <button onClick={prev}>Previous</button>
          <button onClick={next}>Next</button>
        </div>
        {assessmentItems.length > 0 ? (
          <QtiViewerErrorBoundary key={assessmentItems[assessmentIndex]}>
            <QtiViewer
              assessmentItemSrc={assessmentItems[assessmentIndex]}
              inputState={inputState}
              onChange={setInputState}
              stylesheetSrc={stylesheetSrc}
            />
          </QtiViewerErrorBoundary>
        ) : (
          <h3>No Assessment Items</h3>
        )}
      </div>
    </>
  );
};

export const QtiSlideViewer = QtiSlideViewerTemplate.bind({});

QtiSlideViewer.storyName = 'QtiSlideViewer';
QtiSlideViewer.args = {
  assessmentItemSrc: getAssessmentItemSrcParam(),
  stylesheetSrc: resolveUrl('default.css'),
};

function urlize(url: string) {
  return /^(http|https):\/\//.test(url) ? url : `https://${url}`;
}

function normalizeAssessmentItemUrls(assessmentItemSrc: string) {
  return assessmentItemSrc
    .trim()
    .split('\n')
    .filter(s => s.length > 0)
    .map(urlize);
}

function getAssessmentItemSrcParam() {
  return new URL(location.href).searchParams.get('assessmentItemSrc') ?? '';
}

export default {
  title: 'Tests/QtiViewers',
};
