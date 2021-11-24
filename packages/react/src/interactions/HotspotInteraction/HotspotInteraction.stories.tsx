import {QtiViewerTemplate} from '../QtiViewerTemplate';

export default {
  title: 'HotspotInteraction',
};

export const hotspot = QtiViewerTemplate.bind({});

hotspot.args = {
  assessmentItemSrc: 'items/hotspot.xml',
};
