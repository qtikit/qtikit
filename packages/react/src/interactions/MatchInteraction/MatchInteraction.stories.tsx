import {QtiViewerTemplate} from '../QtiViewerTemplate';

export default {
  title: 'MatchInteraction',
};

export const match = QtiViewerTemplate.bind({});

match.args = {
  assessmentItemSrc: 'items/match.xml',
};
