import {QtiViewerTemplate} from '../QtiViewerTemplate';

export default {
  title: 'Interaction/TextEntry',
};

export const text_entry = QtiViewerTemplate.bind({});

text_entry.args = {
  assessmentItemSrc: 'tests/items/text_entry.xml',
};
