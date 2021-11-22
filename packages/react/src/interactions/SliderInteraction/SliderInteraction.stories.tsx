import {QtiViewerTemplate} from '../QtiViewerTemplate';

export default {
  title: 'SliderInteraction',
};

export const slider = QtiViewerTemplate.bind({});

slider.args = {
  assessmentItemSrc: 'items/slider.xml',
};

export const sliderLabel = QtiViewerTemplate.bind({});

sliderLabel.args = {
  assessmentItemSrc: 'items/slider-label.xml',
};
