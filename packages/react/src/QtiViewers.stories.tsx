import React, {useCallback, useState} from 'react';

import {QtiViewerTemplate, QtiViewerView} from './interactions/QtiViewerTemplate';
import {getPathName, resolveUrl} from './utils/url';

const useAssessmentNavigation = (assessmentItems: string[]) => {
  const [assessmentIndex, setAssessmentIndex] = useState(0);

  const prev = useCallback((): void => {
    if (assessmentIndex > 0) {
      setAssessmentIndex(assessmentIndex - 1);
    }
  }, [assessmentIndex]);

  const next = useCallback((): void => {
    if (assessmentIndex < assessmentItems.length - 1) {
      setAssessmentIndex(assessmentIndex + 1);
    }
  }, [assessmentIndex, assessmentItems]);

  return {assessmentItem: assessmentItems[assessmentIndex], prev, next};
};

const QtiLinearViewerTemplate = ({assessmentItemsSrc, stylesheetSrc}) => {
  const assessmentItems = normalizeUrl(assessmentItemsSrc);

  return (
    <>
      <h1>QtiViewers</h1>
      {assessmentItems.map((assessmentItemSrc, index) => (
        <div key={index}>
          <h2>
            QTI: <a href={assessmentItemSrc}>{getPathName(assessmentItemSrc)}</a>
          </h2>
          <QtiViewerTemplate assessmentItemSrc={[assessmentItemSrc]} stylesheetSrc={stylesheetSrc} />
        </div>
      ))}
    </>
  );
};

export const QtiLinearViewer = QtiLinearViewerTemplate.bind({});

QtiLinearViewer.storyName = 'QtiLinearViewer';
QtiLinearViewer.args = {
  assessmentItemsSrc: getAssessmentItemSrcParam(),
  stylesheetSrc: resolveUrl('default.css'),
};

const QtiNonLinearViewerTemplate = ({assessmentItemsSrc, stylesheetSrc}) => {
  const assessmentItems = normalizeUrl(assessmentItemsSrc);
  const {assessmentItem, prev, next} = useAssessmentNavigation(assessmentItems);

  return (
    <>
      <h1>QtiViewers</h1>
      <div>
        <h2>
          QTI: <a href={assessmentItem}>{getPathName(assessmentItem)}</a>
        </h2>
        <div>
          <button onClick={prev}>Previous</button>
          <button onClick={next}>Next</button>
        </div>
        {assessmentItems.length > 0 ? (
          <div>
            <QtiViewerTemplate assessmentItemSrc={[assessmentItem]} stylesheetSrc={stylesheetSrc} />
          </div>
        ) : (
          <h3>No Assessment Items</h3>
        )}
      </div>
    </>
  );
};

export const QtiNonLinearViewer = QtiNonLinearViewerTemplate.bind({});

QtiNonLinearViewer.storyName = 'QtiNonLinearViewer';
QtiNonLinearViewer.args = {
  assessmentItemsSrc: getAssessmentItemSrcParam(),
  stylesheetSrc: resolveUrl('default.css'),
};

const QtiXmlViewerTemplate = ({assessmentItemsSrc, assessmentItemContent, stylesheetSrc}) => {
  return (
    <>
      <h1>QtiViewers with XML</h1>
      {assessmentItemsSrc && (
        <QtiViewerView
          assessmentItemSrc={assessmentItemsSrc}
          assessmentItemContent={assessmentItemContent}
          stylesheetSrc={stylesheetSrc}
        />
      )}
    </>
  );
};

export const QtiXmlViewer = QtiXmlViewerTemplate.bind({});

const defaultXml = `<?xml version="1.0" encoding="UTF-8"?>
<assessmentItem 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqti_v2p2 http://www.imsglobal.org/xsd/qti/qtiv2p2/imsqti_v2p2p2.xsd"
    xmlns="http://www.imsglobal.org/xsd/imsqti_v2p2">
  <responseDeclaration identifier="RESPONSE" cardinality="single" baseType="identifier">
    <correctResponse>
      <value>true</value>
    </correctResponse>
  </responseDeclaration>
  <itemBody>
    <choiceInteraction responseIdentifier="RESPONSE" shuffle="false" maxChoices="1">
      <prompt>Sigmund Freud and Carl Jung both belong to the psychoanalytic school of psychology.</prompt>
      <simpleChoice identifier="true" fixed="true">True</simpleChoice>
      <simpleChoice identifier="false" fixed="true">False</simpleChoice>
    </choiceInteraction>
  </itemBody>
  <responseProcessing>
    <setOutcomeValue identifier="FEEDBACK">
      <variable identifier="RESPONSE"/>
    </setOutcomeValue>
    <responseCondition>
      <responseIf>
        <match>
          <variable identifier="RESPONSE"/>
          <correct identifier="RESPONSE"/>
        </match>
        <setOutcomeValue identifier="SCORE">
            <variable identifier="MAXSCORE"/>
        </setOutcomeValue>
      </responseIf>
    </responseCondition>
  </responseProcessing>
</assessmentItem>`;

QtiXmlViewer.storyName = 'QtiXmlViewer';
QtiXmlViewer.args = {
  assessmentItemsSrc: 'http://localhost:6006',
  assessmentItemContent: defaultXml,
  stylesheetSrc: resolveUrl('default.css'),
};

function normalizeUrl(url: string): string[] {
  return url
    .trim()
    .split('\n')
    .filter(s => s.length > 0);
}

function getAssessmentItemSrcParam() {
  return new URL(location.href).searchParams.get('assessmentItemSrc') ?? '';
}

export default {
  title: 'QtiViewers',
};
