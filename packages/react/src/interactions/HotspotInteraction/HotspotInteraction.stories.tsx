import {QtiViewerTemplate} from '../../QtiViewer.stories';

export default {
  title: 'Interaction/Hotspot',
};

export const hotspot = QtiViewerTemplate.bind({});

hotspot.args = {
  xml: 'tests/items/hotspot.xml',
};
