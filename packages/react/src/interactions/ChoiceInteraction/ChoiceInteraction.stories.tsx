import {QtiViewerTemplate} from '../QtiViewerTemplate';

export default {
  title: 'ChoiceInteractions',
};

export const choice = QtiViewerTemplate.bind({});

choice.args = {
  assessmentItemSrc: 'items/choice.xml',
  onChange: (value: any) => {
    console.log(value);
  },
};
