import {QtiViewerTemplate} from '../QtiViewerTemplate';

export default {
  title: 'Interaction/Hottext',
};

export const hottext = QtiViewerTemplate.bind({});

hottext.args = {
  assessmentItemSrc: 'items/hottext.xml',
};
