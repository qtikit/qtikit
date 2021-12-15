import {QtiViewerTemplate} from '../QtiViewerTemplate';

export default {
  title: 'Interaction/InlineChoice',
};

export const inline_choice = QtiViewerTemplate.bind({});

inline_choice.args = {
  assessmentItemSrc: 'tests/items/inline_choice.xml',
};

export const inline_choice_math = QtiViewerTemplate.bind({});

inline_choice_math.args = {
  assessmentItemSrc: 'tests/items/inline_choice_math.xml',
};
