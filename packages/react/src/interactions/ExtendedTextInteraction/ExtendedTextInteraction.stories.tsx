import {QtiViewerTemplate} from '../QtiViewerTemplate';

export default {
  title: 'Interaction/ExtendedText',
};

export const essay = QtiViewerTemplate.bind({});

essay.args = {
  assessmentItemSrc: 'tests/items/essay.xml',
};

export const extended_text = QtiViewerTemplate.bind({});

extended_text.args = {
  assessmentItemSrc: 'tests/items/extended_text.xml',
};

export const extended_text_rubric = QtiViewerTemplate.bind({});

extended_text_rubric.args = {
  assessmentItemSrc: 'tests/items/extended_text_rubric.xml',
};
