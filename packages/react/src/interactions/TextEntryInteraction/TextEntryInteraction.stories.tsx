import {QtiViewerTemplate} from '../QtiViewerTemplate';

export default {
  title: 'TextEntryInteraction',
};

export const text_entry = QtiViewerTemplate.bind({});

const onChange = (value: any) => {
  console.log(JSON.stringify(value));
};

text_entry.args = {
  assessmentItemSrc: 'items/text_entry.xml',
  onChange,
};
