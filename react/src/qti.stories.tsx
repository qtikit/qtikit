import React from "react";
import { ComponentStory } from "@storybook/react";

import QTIViewer from ".";

export default {
  title: "Items",
};

const Template: ComponentStory<typeof QTIViewer> = (args) => (
  <QTIViewer {...args} />
);

export const Choice = Template.bind({});

Choice.args = {
  xml: `<itemBody>
  <p>Look at the text in the picture.</p>
  <p>
    <img src="images/sign.png" alt="NEVER LEAVE LUGGAGE UNATTENDED"/>
  </p>

  <choiceInteraction
    responseIdentifier="RESPONSE">
    <prompt>What does it say?</prompt>
    <simpleChoice identifier="ChoiceA">
      You must stay with your luggage at all times.
    </simpleChoice>
    <simpleChoice identifier="ChoiceB">
      Do not let someone else look after your luggage.
    </simpleChoice>
    <simpleChoice identifier="ChoiceC">
      Remember your luggage when you leave.
    </simpleChoice>
  </choiceInteraction>
</itemBody>`,
};
