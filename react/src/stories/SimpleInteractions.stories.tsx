import { QtiViewerTemplate } from "./template";

export default {
  title: "Simple Interactions",
};

export const choice = QtiViewerTemplate.bind({});

choice.args = {
  assessmentItemSrc: "http://localhost:6006/tests/items/choice.xml",
};
