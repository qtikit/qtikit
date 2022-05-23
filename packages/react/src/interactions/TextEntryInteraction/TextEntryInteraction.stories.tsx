import {QtiViewerTemplate} from '../../QtiViewer.stories';

import '../../../styles/katex/katex.min.css';

export default {
  title: 'Interaction/TextEntry',
};

export const text_entry = QtiViewerTemplate.bind({});

text_entry.args = {
  xml: 'tests/items/text_entry.xml',
};

export const onyx_latex = QtiViewerTemplate.bind({});

const regexOnyxLaTex = (text: string) => [...text.matchAll(/\$\$(.*)\$\$/g)];

const mapToKaTeXMatch = match => ({
  pattern: match[0],
  latex: match[1].replace(/\$/g, ''),
});

const formulaInputForLaTex = {
  type: 'latex',
  match: (text: string) => regexOnyxLaTex(text).map(mapToKaTeXMatch),
};

onyx_latex.args = {
  xml: 'tests/items/onyx_latex.xml',
  options: {
    formulaInput: formulaInputForLaTex,
  },
};
