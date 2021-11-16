import {QtiViewerTemplate} from '../QtiViewerTemplate';

export default {
  title: 'ExtendedTextInteractions',
};

export const essay = QtiViewerTemplate.bind({});

const onChange = (value: any) => {
  console.log(JSON.stringify(value));
};

essay.args = {
  assessmentItemSrc: 'items/essay.xml',
  onChange,
};

export const extended_text = QtiViewerTemplate.bind({});

extended_text.args = {
  assessmentItemSrc: 'items/extended_text.xml',
  onChange,
};

export const extended_text_rubric = QtiViewerTemplate.bind({});

extended_text_rubric.args = {
  assessmentItemSrc: 'items/extended_text_rubric.xml',
  onChange,
};
