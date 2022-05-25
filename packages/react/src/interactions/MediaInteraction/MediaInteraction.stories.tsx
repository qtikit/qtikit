import {QtiViewerTemplate} from '../../QtiViewer.stories';

export default {
  title: 'Interaction/Media',
};

export const media = QtiViewerTemplate.bind({});

media.args = {
  xml: 'tests/items/media.xml',
};

export const media_coords = QtiViewerTemplate.bind({});

media_coords.args = {
  xml: 'tests/items/media_coords.xml',
};
