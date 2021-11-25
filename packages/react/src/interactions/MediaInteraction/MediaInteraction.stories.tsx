import {QtiViewerTemplate} from '../QtiViewerTemplate';

export default {
  title: 'MediaInteraction',
};

export const media = QtiViewerTemplate.bind({});

media.args = {
  assessmentItemSrc: 'items/media.xml',
};

export const media_coords = QtiViewerTemplate.bind({});

media_coords.args = {
  assessmentItemSrc: 'items/media_coords.xml',
};
