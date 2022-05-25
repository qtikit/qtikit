import {QtiViewerTemplate} from '../../QtiViewer.stories';

export default {
  title: 'Interaction/Slider',
};

export const slider = QtiViewerTemplate.bind({});

slider.args = {
  xml: 'tests/items/slider.xml',
};

export const sliderLabel = QtiViewerTemplate.bind({});

sliderLabel.args = {
  xml: 'tests/items/slider-label.xml',
};
