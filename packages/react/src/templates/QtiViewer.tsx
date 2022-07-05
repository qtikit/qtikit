import {UserInput} from '@qtikit/model/lib/user-input';
import React, {useEffect, useMemo, useState} from 'react';
import responseProcessing, {ResponseProcessingResult} from '@qtikit/scoring-engine/lib/responseProcessing';
import getResponseProcessingConfigFromDocument from '@qtikit/scoring-engine/lib/getResponseProcessingConfigFromDocument';

import {ItemBody, ModalFeedback, QtiDocument, QtiFetchEvent, QtiViewerOptions} from '../';
import {getBaseUrl, getPathName, isHttpUrl, resolveUrl} from '../utils/url';
import {RubricBlock} from '../views/RubricBlock';
import {QtiResponses} from '../views/QtiDocument';
import {fetchText} from '../utils/fetch';
import {isXml, trimXml} from '../utils/xml';

async function createBlobUrl(url: string) {
  const data = await fetch(url);
  return URL.createObjectURL(await data.blob());
}

async function getXmlData(xml: string, fetchXml: boolean) {
  if (fetchXml) {
    return await fetchText(resolveUrl(xml));
  } else if (isXml(xml)) {
    return trimXml(xml);
  } else {
    const url = resolveUrl(xml);
    if (!isHttpUrl(url)) {
      throw new Error(`Invalid XML format, ${xml}`);
    }

    return url;
  }
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
  fetchXml?: false;
};

export const QtiViewerTemplate = ({xml, style, options, viewType, fetchXml}: QtiViewerTemplateProps) => {
  const [inputState, setInputState] = useState<UserInput>({});
  const [document, setDocument] = useState<QtiDocument | null>(null);
  const [resourceCount, setResourceCount] = useState(0);
  const [responseProcessingResult, setAssessmentDocument] = useResponseProcessingResult(inputState);

  const xmlUrl = xml.match(/^(http|https):\/\//) ? xml : resolveUrl(xml);

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
      const xmlData = await getXmlData(xml, fetchXml ?? false);
      const document = await QtiDocument.create(xmlData, resolveUrl(style ?? 'tests/styles/default.css'));

      setDocument(document);
      setAssessmentDocument(document.xml?.root);
    };

    if (xml) {
      create();
    }
  }, [xml, style, setAssessmentDocument, fetchXml]);

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
      {viewType === 'itemBody' && (
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

function useResponseProcessingResult(
  inputState: UserInput = {}
): [ResponseProcessingResult | undefined, (document: Document | undefined) => void] {
  const [assessmentDocument, setAssessmentDocument] = useState<Document | undefined>();
  const responseProcessingResult = useMemo(() => {
    try {
      if (!assessmentDocument) {
        return;
      }

      return responseProcessing(getResponseProcessingConfigFromDocument(assessmentDocument), inputState);
    } catch (e) {
      console.error('Error on processing response', e);
    }
  }, [assessmentDocument, inputState]);

  return [responseProcessingResult, setAssessmentDocument];
}
