import {QtiViewerTemplate} from '../QtiViewerTemplate';

export default {
  title: 'Interaction/GraphicGapMatch',
};

export const graphic_gap_match = QtiViewerTemplate.bind({});

graphic_gap_match.args = {
  assessmentItemSrc: 'items/graphic_gap_match.xml',
};

export const graphic_gap_match_text = QtiViewerTemplate.bind({});

graphic_gap_match_text.args = {
  assessmentItemSrc: 'items/graphic_gap_match_text.xml',
};
