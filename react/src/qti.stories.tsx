import React from "react";
import { ComponentStory } from "@storybook/react";

import QtiViewer from ".";

export default {
  title: "Items",
};

const Template: ComponentStory<typeof QtiViewer> = (args) => (
  <QtiViewer {...args} />
);

export const Choice = Template.bind({});

Choice.args = {
  assessmentItemSrc: "http://localhost:6006/tests/items/choice.xml",
};
