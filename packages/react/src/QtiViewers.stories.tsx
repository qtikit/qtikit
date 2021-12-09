import {UserInput} from '@qtikit/model/lib/user-input';
import React, {useEffect, useState} from 'react';

import QtiViewer from './QtiViewer';
import {getPathName} from './utils/url';

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

const QtiViewersTemplate = ({assessmentItemSrc}) => {
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
              <QtiViewer assessmentItemSrc={assessmentItemSrc} inputState={inputState} onChange={setInputState} />
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
