import {QtiViewerTemplate} from './templates/QtiViewer';

function getXmlParam() {
  return new URL(location.href).searchParams.get('xml') ?? '';
}

export const ItemBodyView = QtiViewerTemplate.bind({});

ItemBodyView.storyName = 'ItemBody';
ItemBodyView.args = {
  xml: getXmlParam(),
  options: {
    showLaTex: true,
  },
};

export const ModalFeedbackView = QtiViewerTemplate.bind({});

ModalFeedbackView.storyName = 'ModalFeedback';
ModalFeedbackView.args = {
  xml: getXmlParam(),
  modal: true,
  options: {
    showLaTex: true,
    showIdentifiers: ['correct'],
  },
};

export default {
  title: 'Viewers/QtiViewer',
};
