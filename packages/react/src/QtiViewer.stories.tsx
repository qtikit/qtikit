import {QtiViewerTemplate} from './templates/QtiViewer';

function getXmlParam() {
  return new URL(location.href).searchParams.get('xml') ?? '';
}

export const ItemBodyView = QtiViewerTemplate.bind({});

ItemBodyView.storyName = 'ItemBody';
ItemBodyView.args = {
  xml: getXmlParam(),
  viewType: 'itemBody',
  options: {
    showLaTex: true,
  },
};

export const ItemBodyViewWithXmlData = QtiViewerTemplate.bind({});

ItemBodyViewWithXmlData.storyName = 'ItemBody with Xml Data';
ItemBodyViewWithXmlData.args = {
  xml: {
    type: 'xml',
    data: 'tests/items/choice.xml',
  },
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
    showIdentifiers: ['correct'],
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
