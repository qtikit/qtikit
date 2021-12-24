import {QtiViewerTemplate} from '../QtiViewerTemplate';

export default {
  title: 'Interaction/Order',
};

export const order = QtiViewerTemplate.bind({});

order.args = {
  assessmentItemSrc: 'tests/items/order.xml',
};

export const order_rtl = QtiViewerTemplate.bind({});

order_rtl.args = {
  assessmentItemSrc: 'tests/items/order_rtl.xml',
};
