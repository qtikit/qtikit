import React from "react";
import { ComponentStory } from "@storybook/react";

import QtiViewer from "../QtiViewer";

export const QtiViewerTemplate: ComponentStory<typeof QtiViewer> = (args) => (
  <QtiViewer {...args} />
);
