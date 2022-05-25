import {QtiViewerTemplate} from '../../QtiViewer.stories';

export default {
  title: 'Interaction/GraphicGapMatch',
};

export const graphic_gap_match = QtiViewerTemplate.bind({});

graphic_gap_match.args = {
  xml: 'tests/items/graphic_gap_match.xml',
};

export const graphic_gap_match_text = QtiViewerTemplate.bind({});

graphic_gap_match_text.args = {
  xml: 'tests/items/graphic_gap_match_text.xml',
};
