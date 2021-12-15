import {QtiViewerTemplate} from '../QtiViewerTemplate';

export default {
  title: 'Interaction/Order',
};

export const order = QtiViewerTemplate.bind({});

order.args = {
  assessmentItemSrc: 'tests/items/order.xml',
};
