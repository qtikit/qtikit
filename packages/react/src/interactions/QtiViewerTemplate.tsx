import React, {useEffect, useMemo, useState} from 'react';
import responseProcessing from '@qtikit/scoring-engine/lib/responseProcessing';
import getResponseProcessingConfigFromDocument from '@qtikit/scoring-engine/lib/getResponseProcessingConfigFromDocument';

import {getBaseUrl, resolveUrl} from '../utils/url';
import QtiViewer, {QtiViewerProps} from '../';
import {AssessmentItem, fetchAssessment, QtiViewerErrorBoundary, StyleSheet} from '../utils';

type InputState = QtiViewerProps['inputState'];

type QtiViewerTemplateProps = {
  assessmentItemSrc: string;
  stylesheetSrc: string;
  inputState?: InputState;
  onChange?: (newState: InputState) => void;
};

const QtiViewerTemplate = ({assessmentItemSrc, stylesheetSrc, inputState, onChange}: QtiViewerTemplateProps) => {
  const [assessmentItem, setAssessmentItem] = useState<AssessmentItem | undefined>(undefined);
  const [styles, setStyles] = useState<StyleSheet | undefined>(undefined);

  const responseProcessingResult = useResponseProcessingResult(assessmentItem, inputState);

  // resolveUrl(stylesheetSrc ? stylesheetSrc.toString() : 'default.css'

  // fetch stylesheet and assessmentItem from outside

  // @NOTE export useful functions to outside
  useEffect(() => {
    const loadAssessmentItem = async () => {
      try {
        const item = new AssessmentItem(assessmentItemSrc);
        await item.fetch();
        setAssessmentItem(item);

        const style = new StyleSheet(stylesheetSrc);
        await style.fetch();
        setStyles(style);
      } catch (e) {
        throw new Error(e);
      }
    };

    loadAssessmentItem();
  }, [assessmentItemSrc, stylesheetSrc, inputState, onChange]);

  return (
    <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
      <div style={{flex: '1', padding: 10}}>
        <QtiViewerErrorBoundary>
          {assessmentItem ? (
            <QtiViewer
              assessmentItem={assessmentItem}
              stylesheet={styles}
              inputState={inputState ?? {}}
              onChange={onChange}
              // resourceBaseUrl={getBaseUrl(assessmentItemSrc)}
            />
          ) : null}
        </QtiViewerErrorBoundary>
      </div>
      <div style={{flex: '1', padding: 10}}>
        <h3>Input State</h3>
        <pre>{JSON.stringify(inputState, null, 2)}</pre>
        <h3>Response Processing Result</h3>
        <pre>{JSON.stringify(responseProcessingResult, null, 2)}</pre>
      </div>
    </div>
  );
};

// const QtiViewersTemplate = ({assessmentItemSrc, stylesheetSrc}: QtiViewersTemplateProps) => {
//   const [inputState, setInputState] = useState<InputState>({});
// const [assessmentItems, setAssessmentItems] = useState<QtiViewersTemplateState[]>([]);
//   const assessmentItemsSrc = React.useMemo(
//     () => (Array.isArray(assessmentItemSrc) ? assessmentItemSrc : [assessmentItemSrc]).map(src => resolveUrl(src)),
//     [assessmentItemSrc]
//   );

//   useEffect(() => {
//     const fetch = async () => {
//       setAssessmentItems(await fetchAssessment(assessmentItemsSrc));
//     };

//     fetch();
//   }, [assessmentItemsSrc]);

//   return (
//     <>
//       {assessmentItems.map((assessmentItem, index) => (
//         <QtiViewerTemplate
//           key={index}
//           assessmentItemSrc={assessmentItem.src}
//           assessmentItemContent={assessmentItem.content}
//           stylesheetSrc={stylesheetSrc}
//           inputState={inputState}
//           onChange={setInputState}
//         />
//       ))}
//     </>
//   );
// };

function useResponseProcessingResult(assessmentItem?: AssessmentItem, inputState: InputState = {}) {
  const responseProcessingResult = useMemo(() => {
    try {
      if (!assessmentItem || !assessmentItem?.document) {
        return;
      }

      return responseProcessing(getResponseProcessingConfigFromDocument(assessmentItem.document), inputState);
    } catch (e) {
      console.error(e);
      console.log(assessmentItem?.content);
    }
  }, [assessmentItem, inputState]);
  return responseProcessingResult;
}

export {QtiViewerTemplate};
