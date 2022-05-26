import {QtiViewerTemplate} from '../../templates/QtiViewer';

export default {
  title: 'Interaction/TextEntry',
};

export const text_entry = QtiViewerTemplate.bind({});

text_entry.args = {
  xml: 'tests/items/text_entry.xml',
};

export const onyx_latex = QtiViewerTemplate.bind({});

onyx_latex.args = {
  xml: 'tests/items/onyx_latex.xml',
  options: {
    showLaTex: true,
  },
};
