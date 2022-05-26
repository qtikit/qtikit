import {UserInput} from '@qtikit/model/lib/user-input';
import React, {useEffect, useState} from 'react';

import {ItemBody, ModalFeedback, QtiDocument} from './';
import {getPathName, resolveBaseUrl} from './utils/url';

function getXmlParam() {
  return new URL(location.href).searchParams.get('xml') ?? '';
}

class ErrorBoundary extends React.Component<{children: any}, {hasError: false; error: Error | null}> {
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

export const QtiViewerTemplate = ({xml, style, onAction, onMatch, options, modal}) => {
  const [inputState, setInputState] = useState<UserInput>({});
  const [document, setDocument] = useState<QtiDocument | null>(null);

  console.log('modal', modal);

  const Viewer = modal ? ModalFeedback : ItemBody;

  useEffect(() => {
    const create = async () => {
      const xmlUrl = xml.match(/^(http|https):\/\//) ? xml : resolveBaseUrl(xml);
      const document = await QtiDocument.create(xmlUrl, resolveBaseUrl(style ?? 'tests/styles/default.css'), url => {
        console.log('Fetch Resournce:', url);
        return url;
      });
      setDocument(document);
    };

    if (xml) {
      create();
    }
  }, [xml, style]);

  return (
    <>
      <h1>Input Assessment Urls</h1>
      <div>
        <h2>
          QTI: <a href={xml}>{getPathName(xml)}</a>
        </h2>
        <ErrorBoundary key={xml}>
          {document && (
            <Viewer
              document={document}
              inputState={inputState}
              onChange={setInputState}
              onAction={onAction}
              options={options}
            />
          )}
        </ErrorBoundary>
      </div>
    </>
  );
};

export const ItemBodyView = QtiViewerTemplate.bind({});

ItemBodyView.storyName = 'ItemBody';
ItemBodyView.args = {
  xml: getXmlParam(),
  viewType: 'itemBody',
  options: {
    showLaTex: true,
  },
};

export const ModalFeedbackView = QtiViewerTemplate.bind({});

ModalFeedbackView.storyName = 'ModalFeedback';
ModalFeedbackView.args = {
  xml: getXmlParam(),
  viewType: 'modal',
  options: {
    showLaTex: true,
    identifiers: ['correct'],
  },
};

export const RubricBlockView = QtiViewerTemplate.bind({});

RubricBlockView.storyName = 'RubricBlock';
RubricBlockView.args = {
  xml: getXmlParam(),
  viewType: 'rubric',
  options: {
    showLaTex: true,
  },
};

export default {
  title: 'Viewers/QtiViewer',
};
