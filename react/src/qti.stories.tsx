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
  xml: `<?xml version="1.0" encoding="UTF-8"?>
  <assessmentItem xmlns="http://www.imsglobal.org/xsd/imsqti_v2p2"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqti_v2p2  http://www.imsglobal.org/xsd/qti/qtiv2p2/imsqti_v2p2p2"
    identifier="choice"
    title="Unattended Luggage"
    adaptive="false"
    timeDependent="false">

    <responseDeclaration identifier="RESPONSE" cardinality="single" baseType="identifier">
      <correctResponse>
        <value>ChoiceA</value>
      </correctResponse>
    </responseDeclaration>

    <outcomeDeclaration identifier="SCORE" cardinality="single" baseType="float">
      <defaultValue>
        <value>0</value>
      </defaultValue>
    </outcomeDeclaration>

    <itemBody>
      <p>Look at the text in the picture.</p>
      <p>
        <img src="images/sign.png" alt="NEVER LEAVE LUGGAGE UNATTENDED"/>
      </p>

      <choiceInteraction responseIdentifier="RESPONSE">
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
    </itemBody>

    <responseProcessing template="http://www.imsglobal.org/question/qti_v2p2/rptemplates/match_correct.xml"/>
  </assessmentItem>
  `,
};
