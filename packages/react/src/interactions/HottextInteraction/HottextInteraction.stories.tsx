import {QtiViewerTemplate} from '../../templates/QtiViewer';

export default {
  title: 'Interaction/Hottext',
};

export const hottext = QtiViewerTemplate.bind({});

hottext.args = {
  xml: 'tests/items/hottext.xml',
};
