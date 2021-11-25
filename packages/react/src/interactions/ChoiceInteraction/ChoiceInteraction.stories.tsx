import {QtiViewerTemplate} from '../QtiViewerTemplate';

export default {
  title: 'ChoiceInteractions',
};

export const choice = QtiViewerTemplate.bind({});

choice.args = {
  assessmentItemSrc: 'items/choice.xml',
};

export const orkney1 = QtiViewerTemplate.bind({});

orkney1.args = {
  assessmentItemSrc: 'items/orkney1.xml',
};
