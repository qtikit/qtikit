import {QtiViewerTemplate} from '../QtiViewerTemplate';

export default {
  title: 'Interaction/Order',
};

export const order = QtiViewerTemplate.bind({});

order.args = {
  assessmentItemSrc: 'items/order.xml',
};
