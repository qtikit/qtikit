import {QtiViewerTemplate} from '../QtiViewerTemplate';

export default {
  title: 'GapMatchInteractions',
};

export const gap_match = QtiViewerTemplate.bind({});

gap_match.args = {
  assessmentItemSrc: 'items/gap_match.xml',
  onChange: (value: any) => {
    console.log(value);
  },
};
