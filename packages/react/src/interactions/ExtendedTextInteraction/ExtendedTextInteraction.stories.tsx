import {QtiViewerTemplate} from '../../templates/QtiViewer';

export default {
  title: 'Interaction/ExtendedText',
};

export const essay = QtiViewerTemplate.bind({});

essay.args = {
  xml: 'tests/items/essay.xml',
};

export const extended_text = QtiViewerTemplate.bind({});

extended_text.args = {
  xml: 'tests/items/extended_text.xml',
};

export const extended_text_rubric = QtiViewerTemplate.bind({});

extended_text_rubric.args = {
  xml: 'tests/items/extended_text_rubric.xml',
};
