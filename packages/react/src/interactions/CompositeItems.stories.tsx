import {QtiViewerTemplate} from '../templates/QtiViewer';

export const multi_input = QtiViewerTemplate.bind({});

multi_input.args = {
  xml: 'tests/items/multi-input.xml',
};

export const upload_composite = QtiViewerTemplate.bind({});

upload_composite.args = {
  xml: 'tests/items/upload_composite.xml',
};

export default {
  title: 'Interaction/CompositeItems',
};
