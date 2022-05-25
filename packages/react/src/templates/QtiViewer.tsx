import {UserInput} from '@qtikit/model/lib/user-input';
import React, {useEffect, useMemo, useState} from 'react';
import responseProcessing from '@qtikit/scoring-engine/lib/responseProcessing';
import getResponseProcessingConfigFromDocument from '@qtikit/scoring-engine/lib/getResponseProcessingConfigFromDocument';

import {ItemBody, ModalFeedback, QtiDocument, FetchStartEvent, ViewerOptions} from '../';
import {getPathName, resolveBaseUrl} from '../utils/url';

class ErrorBoundary extends React.Component<{children: any}, {hasError: false; error: Error | null}> {
  constructor(props: {children: any} | Readonly<{children: any}>) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  componentDidCatch(error: any) {
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

export type QtiViewerTemplateProps = {
  xml: string;
  style: string;
  options?: ViewerOptions;
  modal?: boolean;
};
export const QtiViewerTemplate = ({xml, style, options, modal}: QtiViewerTemplateProps) => {
  const [inputState, setInputState] = useState<UserInput>({});
  const [document, setDocument] = useState<QtiDocument | null>(null);

  const assessmentItemDocument = useAssignmentItemDocument(xml);
  const responseProcessingResult = useResponseProcessingResult(assessmentItemDocument, inputState);

  const Viewer = modal ? ModalFeedback : ItemBody;

  useEffect(() => {
    const create = async () => {
      const xmlUrl = xml.match(/^(http|https):\/\//) ? xml : resolveBaseUrl(xml);
      const document = await QtiDocument.create(
        xmlUrl,
        resolveBaseUrl(style ?? 'tests/styles/default.css'),
        (url: any) => {
          console.log('Fetch Resournce:', url);
          return url;
        }
      );
      setDocument(document);
    };

    if (xml) {
      create();
    }
  }, [xml, style]);

  return (
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
            onFetchStart={(event: FetchStartEvent) => {
              console.log('onFetchStart', event);
              return event.url;
            }}
            options={options}
          />
        )}
      </ErrorBoundary>
      {!modal && (
        <div style={{flex: '1', padding: 10}}>
          <h3>Input State</h3>
          <pre>{JSON.stringify(inputState, null, 2)}</pre>
          <h3>Response Processing Result</h3>
          <pre>{JSON.stringify(responseProcessingResult, null, 2)}</pre>
        </div>
      )}
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
