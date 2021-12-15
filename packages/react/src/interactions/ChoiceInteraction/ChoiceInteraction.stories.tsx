import {QtiViewerTemplate} from '../QtiViewerTemplate';

export default {
  title: 'Interaction/Choice',
};

export const choice = QtiViewerTemplate.bind({});

choice.args = {
  assessmentItemSrc: 'tests/items/choice.xml',
};

export const orkney1 = QtiViewerTemplate.bind({});

orkney1.args = {
  assessmentItemSrc: 'tests/items/orkney1.xml',
};
