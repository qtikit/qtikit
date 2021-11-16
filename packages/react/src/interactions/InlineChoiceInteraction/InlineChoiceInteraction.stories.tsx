import {QtiViewerTemplate} from '../QtiViewerTemplate';

export default {
  title: 'InlineChoiceInteraction',
};

const onChange = (value: any) => {
  console.log(JSON.stringify(value));
};

export const inline_choice = QtiViewerTemplate.bind({});

inline_choice.args = {
  assessmentItemSrc: 'items/inline_choice.xml',
  onChange,
};

export const inline_choice_math = QtiViewerTemplate.bind({});

inline_choice_math.args = {
  assessmentItemSrc: 'items/inline_choice_math.xml',
  onChange,
};
