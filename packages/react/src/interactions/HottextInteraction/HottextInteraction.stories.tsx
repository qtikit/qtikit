import {QtiViewerTemplate} from '../QtiViewerTemplate';

export default {
  title: 'HottextInteraction',
};

export const hottext = QtiViewerTemplate.bind({});

hottext.args = {
  assessmentItemSrc: 'items/hottext.xml',
};
