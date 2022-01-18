import React from 'react';

import {resolveUrl} from '../../utils';
import {QtiViewerView} from '../QtiViewerTemplate';

export default {
  title: 'Interaction/Choice',
};

const QtiCorrectionViewer = ({assessmentItemSrc, stylesheetSrc, inputState}) => {
  return (
    <QtiViewerView
      assessmentItemSrc={resolveUrl(assessmentItemSrc)}
      stylesheetSrc={stylesheetSrc}
      inputState={inputState}
    />
  );
};

export const choiceWithCorrectResponse = QtiCorrectionViewer.bind({});

choiceWithCorrectResponse.args = {
  assessmentItemSrc: 'tests/items/choice.xml',
  inputState: {RESPONSE: ['ChoiceA']},
};

export const choiceWithIncorrectResponse = QtiCorrectionViewer.bind({});

choiceWithIncorrectResponse.args = {
  assessmentItemSrc: 'tests/items/choice.xml',
  inputState: {RESPONSE: ['ChoiceB']},
};
