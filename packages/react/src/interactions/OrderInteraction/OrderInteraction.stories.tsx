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

export const order_partial_scoring = QtiViewerTemplate.bind({});

order_partial_scoring.args = {
  assessmentItemSrc: 'tests/items/order_partial_scoring.xml',
};

export const order_orientation = QtiViewerTemplate.bind({});

order_orientation.args = {
  assessmentItemSrc: 'tests/items/order_orientation.xml',
};
