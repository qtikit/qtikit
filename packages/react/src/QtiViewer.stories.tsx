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
  xml: 'tests/items/choice.xml',
  viewType: 'itemBody',
  options: {
    showLaTex: true,
  },
  fetchXml: true,
};

export const ItemBodyViewWithXmlRawData = QtiViewerTemplate.bind({});

ItemBodyViewWithXmlRawData.storyName = 'ItemBody with Xml Raw Data';
ItemBodyViewWithXmlRawData.args = {
  xml: '',
  viewType: 'itemBody',
  options: {
    showLaTex: true,
  },
  fetchXml: false,
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
