import {UserInput} from '@qtikit/model/lib/user-input';
import React, {useEffect, useMemo, useState} from 'react';
import responseProcessing from '@qtikit/scoring-engine/lib/responseProcessing';
import getResponseProcessingConfigFromDocument from '@qtikit/scoring-engine/lib/getResponseProcessingConfigFromDocument';

import {ItemBody, ModalFeedback, QtiDocument, QtiFetchEvent, QtiViewerOptions} from '../';
import {getBaseUrl, getPathName, resolveUrl} from '../utils/url';
import {RubricBlock} from '../views/RubricBlock';
import {QtiResponses} from '../views/QtiDocument';
import {fetchText} from '../utils/fetch';

async function createBlobUrl(url: string) {
  const data = await fetch(url);
  return URL.createObjectURL(await data.blob());
}

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

const Document = ({document}: {document: QtiDocument}) => (
  <div>
    <h2>Interactions</h2>
    {document.interactions.map((interaction: QtiResponses) => (
      <div key={interaction.name}>
        <div>name: {interaction.name}</div>
        <div>responseIdentifier: {interaction.responseIdentifier}</div>
        <div>
          element:{' '}
          <div>
            <textarea rows={3} cols={80} defaultValue={interaction.element.innerHTML} />
          </div>
        </div>
      </div>
    ))}
    <h2>Correct Response</h2>
    {Object.values(document.correctResponses).map(response =>
      response.map((response: number) => <div key={response}>{response}</div>)
    )}
  </div>
);
export type QtiViewerTemplateProps = {
  xml: string | any;
  style: string;
  options?: QtiViewerOptions;
  viewType?: string;
};

export const QtiViewerTemplate = ({xml, style, options, viewType}: QtiViewerTemplateProps) => {
  const [inputState, setInputState] = useState<UserInput>({});
  const [document, setDocument] = useState<QtiDocument | null>(null);
  const [resourceCount, setResourceCount] = useState(0);

  const xmlUrl =
    typeof xml === 'string' ? (xml.match(/^(http|https):\/\//) ? xml : resolveUrl(xml)) : resolveUrl(xml.data);

  const assessmentItemDocument = useAssignmentItemDocument(xml);
  const responseProcessingResult = useResponseProcessingResult(assessmentItemDocument, inputState);

  const Viewer = (() => {
    switch (viewType) {
      case 'modal':
        return ModalFeedback;
      case 'rubric':
        return RubricBlock;
      default:
        return ItemBody;
    }
  })();

  useEffect(() => {
    const create = async () => {
      const xmlData = typeof xml === 'string' ? resolveUrl(xml) : await fetchText(resolveUrl(xml.data));
      const document = await QtiDocument.create(xmlData, resolveUrl(style ?? 'tests/styles/default.css'));
      setDocument(document);
    };

    if (xml) {
      create();
    }
  }, [xml, style]);

  return (
    <div>
      <h2>
        QTI: <a href={xml}>{getPathName(xmlUrl)}</a>
      </h2>
      <ErrorBoundary key={xml}>
        {document && (
          <div>
            <Viewer
              document={document}
              inputState={inputState}
              onChange={setInputState}
              onFetchStart={async (event: QtiFetchEvent) => {
                setResourceCount(resourceCount => resourceCount + 1);

                const baseUrl = getBaseUrl(resolveUrl(xml.data ? xml.data : xml));
                const url = await createBlobUrl(resolveUrl(event.url, baseUrl));

                console.log('onFetchStart', event, url, baseUrl);
                return url;
              }}
              onFetchEnd={(event: QtiFetchEvent) => {
                console.log('onFetchEnd', event);
                setResourceCount(resourceCount => resourceCount - 1);
              }}
              options={options}
            />
            <Document document={document} />
          </div>
        )}
      </ErrorBoundary>
      <div>
        <h3>Resource Cound</h3>
        <div>
          {resourceCount}, {resourceCount === 0 ? 'completed' : 'incompleted'}
        </div>
      </div>
      {viewType === 'itemBay' && (
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

function useAssignmentItemDocument(xml: string | any) {
  const [assessmentItemDocument, setAssessmentItemDocument] = useState<Document>();
  useEffect(() => {
    const init = async () => {
      const xmlData = typeof xml === 'string' ? await fetchText(xml) : xml.data;
      try {
        const document = new DOMParser().parseFromString(xmlData, 'text/xml');
        setAssessmentItemDocument(document);
      } catch (e) {
        console.error(e);
      }
    };

    init();
  }, [xml]);
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
