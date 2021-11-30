import {QtiViewerTemplate} from '../QtiViewerTemplate';

export default {
  title: 'Interaction/Match',
};

export const match = QtiViewerTemplate.bind({});

match.args = {
  assessmentItemSrc: 'items/match.xml',
};
