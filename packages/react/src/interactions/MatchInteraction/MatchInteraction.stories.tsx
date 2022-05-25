import {QtiViewerTemplate} from '../../templates/QtiViewer';

export default {
  title: 'Interaction/Match',
};

export const match = QtiViewerTemplate.bind({});

match.args = {
  xml: 'tests/items/match.xml',
};
