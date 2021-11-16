import {QtiViewerTemplate} from '../QtiViewerTemplate';

export default {
  title: 'InlineChoiceInteraction',
};

export const inline_choice = QtiViewerTemplate.bind({});

inline_choice.args = {
  assessmentItemSrc: 'items/inline_choice.xml',
};

export const inline_choice_math = QtiViewerTemplate.bind({});

inline_choice_math.args = {
  assessmentItemSrc: 'items/inline_choice_math.xml',
};
