import {QtiViewerTemplate} from '../QtiViewerTemplate';

export default {
  title: 'OrderInteraction',
};

export const order = QtiViewerTemplate.bind({});

order.args = {
  assessmentItemSrc: 'items/order.xml',
};
