import {QtiViewerTemplate} from '../../QtiViewer.stories';

export default {
  title: 'Interaction/InlineChoice',
};

export const inline_choice = QtiViewerTemplate.bind({});

inline_choice.args = {
  xml: 'tests/items/inline_choice.xml',
};

export const inline_choice_math = QtiViewerTemplate.bind({});

inline_choice_math.args = {
  xml: 'tests/items/inline_choice_math.xml',
};
