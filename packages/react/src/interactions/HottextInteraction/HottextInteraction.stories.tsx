import {QtiViewerTemplate} from '../../QtiViewer.stories';

export default {
  title: 'Interaction/Hottext',
};

export const hottext = QtiViewerTemplate.bind({});

hottext.args = {
  xml: 'tests/items/hottext.xml',
};
