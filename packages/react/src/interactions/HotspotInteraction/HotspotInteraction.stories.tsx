import {QtiViewerTemplate} from '../QtiViewerTemplate';

export default {
  title: 'Interaction/Hotspot',
};

export const hotspot = QtiViewerTemplate.bind({});

hotspot.args = {
  assessmentItemSrc: 'tests/items/hotspot.xml',
};
