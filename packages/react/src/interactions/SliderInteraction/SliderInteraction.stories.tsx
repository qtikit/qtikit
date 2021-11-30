import {QtiViewerTemplate} from '../QtiViewerTemplate';

export default {
  title: 'Interaction/Slider',
};

export const slider = QtiViewerTemplate.bind({});

slider.args = {
  assessmentItemSrc: 'items/slider.xml',
};

export const sliderLabel = QtiViewerTemplate.bind({});

sliderLabel.args = {
  assessmentItemSrc: 'items/slider-label.xml',
};
