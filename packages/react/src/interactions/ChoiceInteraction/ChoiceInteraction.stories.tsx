import {QtiViewerTemplate} from '../QtiViewerTemplate';

export default {
  title: 'Interaction/Choice',
};

export const choice = QtiViewerTemplate.bind({});

choice.args = {
  assessmentItemSrc: 'tests/items/choice.xml',
};

export const choice_multiple = QtiViewerTemplate.bind({});

choice_multiple.args = {
  assessmentItemSrc: 'tests/items/choice_multiple.xml',
};

export const choice_fixed = QtiViewerTemplate.bind({});

choice_fixed.args = {
  assessmentItemSrc: 'tests/items/choice_fixed.xml',
};

export const choice_orientation = QtiViewerTemplate.bind({});

choice_orientation.args = {
  assessmentItemSrc: 'tests/items/choice_orientation.xml',
};

export const orkney1 = QtiViewerTemplate.bind({});

orkney1.args = {
  assessmentItemSrc: 'tests/items/orkney1.xml',
};
