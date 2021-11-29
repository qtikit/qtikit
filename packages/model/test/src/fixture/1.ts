export default `
  <responseDeclaration baseType="identifier" cardinality="single" identifier="RESPONSE">
    <correctResponse>
      <value>foo</value>
    </correctResponse>
  </responseDeclaration>
  <outcomeDeclaration baseType="float" cardinality="single" identifier="SCORE">
    <defaultValue>
      <value>0</value>
    </defaultValue>
  </outcomeDeclaration>
  <responseProcessing>
    <responseCondition>
      <responseIf>
        <match>
          <variable identifier="RESPONSE"/>
          <correct identifier="RESPONSE"/>
        </match>
        <setOutcomeValue identifier="SCORE">
          <baseValue baseType="float">1</baseValue>
        </setOutcomeValue>
      </responseIf>
      <responseElse>
        <setOutcomeValue identifier="SCORE">
          <baseValue baseType="float">0</baseValue>
        </setOutcomeValue>
      </responseElse>
    </responseCondition>
  </responseProcessing>
`;
