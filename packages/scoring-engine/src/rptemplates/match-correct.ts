import type {ResponseProcessing} from '@qtikit/model/lib/qti2_2';

const responseProcessing: ResponseProcessing = JSON.parse(
  `{"$children":[["responseRuleGroup",{"$selection":["responseCondition",{"$children":[["responseIf",{"$children":[["expressionGroup",{"$selection":["match",{"$children":[["logic",{"$selection":["variable",{"identifier":{"$value":"RESPONSE"}}]}],["logic",{"$selection":["correct",{"identifier":{"$value":"RESPONSE"}}]}]]}]}],["responseRuleGroup",{"$selection":["setOutcomeValue",{"$children":[["expressionGroup",{"$selection":["baseValue",{"$value":"1","baseType":"float"}]}]],"identifier":{"$value":"SCORE"}}]}]]}],["responseElse",{"$children":[["responseRuleGroup",{"$selection":["setOutcomeValue",{"$children":[["expressionGroup",{"$selection":["baseValue",{"$value":"0","baseType":"float"}]}]],"identifier":{"$value":"SCORE"}}]}]]}]]}]}]]}`
);

export default responseProcessing;
