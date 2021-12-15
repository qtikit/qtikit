import {QtiViewerTemplate} from '../QtiViewerTemplate';

export default {
  title: 'Interaction/GapMatch',
};

export const gap_match = QtiViewerTemplate.bind({});

gap_match.args = {
  assessmentItemSrc: 'tests/items/gap_match.xml',
};
