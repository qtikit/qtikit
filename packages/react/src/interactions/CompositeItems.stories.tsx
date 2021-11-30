import {QtiViewerTemplate} from './QtiViewerTemplate';

export default {
  title: 'CompositeItems',
};

export const multi_input = QtiViewerTemplate.bind({});

multi_input.args = {
  assessmentItemSrc: 'items/multi-input.xml',
};

export const upload_composite = QtiViewerTemplate.bind({});

upload_composite.args = {
  assessmentItemSrc: 'items/upload_composite.xml',
};
