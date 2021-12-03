import type {ResponseProcessing} from '@qtikit/model/lib/qti2_2';

const responseProcessing: ResponseProcessing = JSON.parse(
  `{"$children":[["responseRuleGroup",{"$selection":["responseCondition",{"$children":[["responseIf",{"$children":[["expressionGroup",{"$selection":["isNull",{"$children":[["logic",{"$selection":["variable",{"identifier":{"$value":"RESPONSE"}}]}]]}]}],["responseRuleGroup",{"$selection":["setOutcomeValue",{"$children":[["expressionGroup",{"$selection":["baseValue",{"$value":"0.0","baseType":"float"}]}]],"identifier":{"$value":"SCORE"}}]}]]}],["responseElse",{"$children":[["responseRuleGroup",{"$selection":["setOutcomeValue",{"$children":[["expressionGroup",{"$selection":["mapResponse",{"identifier":{"$value":"RESPONSE"}}]}]],"identifier":{"$value":"SCORE"}}]}]]}]]}]}]]}`
);

export default responseProcessing;
