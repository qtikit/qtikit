import {QtiViewerTemplate} from '../../templates/QtiViewer';

export default {
  title: 'Interaction/GapMatch',
};

export const gap_match = QtiViewerTemplate.bind({});

gap_match.args = {
  xml: 'tests/items/gap_match.xml',
};
