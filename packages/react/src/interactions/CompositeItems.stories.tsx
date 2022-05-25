import {getUrls, QtiViewerTemplate} from '../QtiViewer.stories';

export default {
  title: 'CompositeItems',
};

export const multi_input = QtiViewerTemplate.bind({});

multi_input.args = {
  ...getUrls('tests/items/multi-input.xml'),
};

export const upload_composite = QtiViewerTemplate.bind({});

upload_composite.args = {
  ...getUrls('tests/items/upload_composite.xml'),
};
