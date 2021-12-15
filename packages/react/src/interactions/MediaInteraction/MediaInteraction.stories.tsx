import {QtiViewerTemplate} from '../QtiViewerTemplate';

export default {
  title: 'Interaction/Media',
};

export const media = QtiViewerTemplate.bind({});

media.args = {
  assessmentItemSrc: 'tests/items/media.xml',
};

export const media_coords = QtiViewerTemplate.bind({});

media_coords.args = {
  assessmentItemSrc: 'tests/items/media_coords.xml',
};
