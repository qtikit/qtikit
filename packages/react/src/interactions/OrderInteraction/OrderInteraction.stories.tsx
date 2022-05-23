import {QtiViewerTemplate} from '../../templates/QtiViewer';

export default {
  title: 'Interaction/Order',
};

export const order = QtiViewerTemplate.bind({});

order.args = {
  xml: 'tests/items/order.xml',
};

export const order_rtl = QtiViewerTemplate.bind({});

order_rtl.args = {
  xml: 'tests/items/order_rtl.xml',
};

export const order_partial_scoring = QtiViewerTemplate.bind({});

order_partial_scoring.args = {
  xml: 'tests/items/order_partial_scoring.xml',
};

export const order_orientation = QtiViewerTemplate.bind({});

order_orientation.args = {
  xml: 'tests/items/order_orientation.xml',
};
